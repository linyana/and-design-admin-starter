import {
	createBrowserRouter,
	redirect,
	isRouteErrorResponse,
	useRouteError,
} from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import { Result, Button } from "antd";
import axios from "axios";
import type { IRouteType } from "@/types";
import { useGlobal } from "@/hooks";
import { LayoutProvider } from "../Layout";
import { NoAccess } from "@/pages";
import { routes } from "@/routes";

const requireAuth = async (route: IRouteType) => {
	if (route.auth === false) return null;

	const { token, user, apiBaseUrl, actions, permissions: storedPermissions } =
		useGlobal.getState();

	if (!token) throw redirect("/login");

	let currentUser = user;
	let currentPermissions = storedPermissions;

	if (!currentUser) {
		try {
			const res = await axios.get(`${apiBaseUrl}/users/me`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			currentUser = res.data?.data || res.data;
			currentPermissions = currentUser?.permissions || [];

			actions.set({
				user: currentUser,
				permissions: currentPermissions,
			});
		} catch (err: any) {
			const status = err?.response?.status || 0;
			if (status === 401) {
				actions.logout();
				throw redirect("/login");
			}
			if (status === 403) {
				throw new Response("Forbidden", { status: 403 });
			}
			throw err;
		}
	}

	const required = route.permissions || [];
	if (!required.length) return null;

	const list = Array.from(
		new Set([
			...(currentPermissions || []),
			...(currentUser?.permissions || []),
		])
	);

	const ok = required.every((p) => list.includes(p));
	if (!ok) throw new Response("Forbidden", { status: 403 });

	return null;
};

const toRouteObjects = (items: IRouteType[]): RouteObject[] => {
	return items.map((r) => {
		const routeObject: RouteObject = {
			path: r.path,
			index: r.index,
			element: r.element,
			loader: () => requireAuth(r),
			handle: {
				layout: r.layout,
				menu: r.menu,
			},
			children: r.children ? toRouteObjects(r.children) : undefined,
		};

		if (r.auth === false) {
			routeObject.loader = undefined;
		}

		return routeObject;
	});
};

const RouteErrorElement = () => {
	const err = useRouteError();

	if (isRouteErrorResponse(err)) {
		if (err.status === 403) return <NoAccess />;
		if (err.status === 404) {
			return <Result status="404" title="404" subTitle="Not Found" />;
		}
		return (
			<Result
				status="500"
				title="Error"
				subTitle={err.statusText || "Something went wrong"}
				extra={
					<Button type="primary" onClick={() => window.location.reload()}>
						Reload
					</Button>
				}
			/>
		);
	}

	return (
		<Result
			status="500"
			title="Error"
			subTitle="Something went wrong"
			extra={
				<Button type="primary" onClick={() => window.location.reload()}>
					Reload
				</Button>
			}
		/>
	);
};

export const router = createBrowserRouter([
	{
		path: "/",
		element: <LayoutProvider />,
		errorElement: <RouteErrorElement />,
		children: toRouteObjects(routes),
	},
]);


"use client";

/**
 * Original design by Gustavo Fior (@gustavo-fior) and Foglamp Labs,
 * co-founded by Abdul Haidar. Extracted AS-IS from foglamp-labs/foglamp.
 */

import * as React from "react";

type FoglampLinkComponent = React.ElementType;

const FoglampLinkContext = React.createContext<FoglampLinkComponent>("a");

export type FoglampLinkProviderProps = {
	/** Router or link component that should render every FoglampLink below it. */
	component: FoglampLinkComponent;
	children: React.ReactNode;
};

export function FoglampLinkProvider({
	component,
	children,
}: FoglampLinkProviderProps) {
	return (
		<FoglampLinkContext.Provider value={component}>
			{children}
		</FoglampLinkContext.Provider>
	);
}

/**
 * A link with no wrapper of its own. The provider component receives the
 * original props directly, so the rendered DOM and styling stay with the
 * router's link implementation. A per-link component or `as` can override it.
 */
export type FoglampLinkProps<Component extends FoglampLinkComponent = "a"> =
	React.ComponentPropsWithRef<Component> & {
		component?: Component;
		as?: Component;
		/** Common router destination prop, available with the default anchor type. */
		to?: string;
	};

export function FoglampLink<Component extends FoglampLinkComponent = "a">({
	component,
	as,
	...props
}: FoglampLinkProps<Component>) {
	const providerComponent = React.useContext(FoglampLinkContext);
	const LinkComponent = component ?? as ?? providerComponent;

	return React.createElement(LinkComponent, props as React.ComponentPropsWithRef<Component>);
}

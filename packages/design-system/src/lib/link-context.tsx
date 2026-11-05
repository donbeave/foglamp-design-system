/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance tailrocks-original
 * @inspiration https://github.com/foglamp-labs/foglamp (Gustavo Fior @gustavo-fior, Abdul Haidar, Foglamp Labs — https://foglamp.dev)
 *
 * Authored by Tailrocks (https://github.com/tailrocks). Inspired by the visual
 * design language of Foglamp by Gustavo Fior (@gustavo-fior), Abdul Haidar, and
 * Foglamp Labs (https://foglamp.dev). Not an upstream Foglamp source file.
 */

"use client";

/**
 * Original design by Gustavo Fior (@gustavo-fior) and Foglamp Labs,
 * co-founded by Abdul Haidar. Extracted AS-IS from foglamp-labs/foglamp.
 */

import * as React from "react";

type FramerockLinkComponent = React.ElementType;

const FramerockLinkContext = React.createContext<FramerockLinkComponent>("a");

export type FramerockLinkProviderProps = {
	/** Router or link component that should render every FramerockLink below it. */
	component: FramerockLinkComponent;
	children: React.ReactNode;
};

export function FramerockLinkProvider({
	component,
	children,
}: FramerockLinkProviderProps) {
	return (
		<FramerockLinkContext.Provider value={component}>
			{children}
		</FramerockLinkContext.Provider>
	);
}

/**
 * A link with no wrapper of its own. The provider component receives the
 * original props directly, so the rendered DOM and styling stay with the
 * router's link implementation. A per-link component or `as` can override it.
 */
export type FramerockLinkProps<Component extends FramerockLinkComponent = "a"> =
	React.ComponentPropsWithRef<Component> & {
		component?: Component;
		as?: Component;
		/** Common router destination prop, available with the default anchor type. */
		to?: string;
	};

export function FramerockLink<Component extends FramerockLinkComponent = "a">({
	component,
	as,
	...props
}: FramerockLinkProps<Component>) {
	const providerComponent = React.useContext(FramerockLinkContext);
	const LinkComponent = component ?? as ?? providerComponent;

	return React.createElement(LinkComponent, props as React.ComponentPropsWithRef<Component>);
}

/** @deprecated Use FramerockLinkProvider. This alias preserves the same component identity. */
export const FoglampLinkProvider = FramerockLinkProvider;
/** @deprecated Use FramerockLinkProviderProps. */
export type FoglampLinkProviderProps = FramerockLinkProviderProps;
/** @deprecated Use FramerockLinkProps. */
export type FoglampLinkProps<Component extends FramerockLinkComponent = "a"> =
	FramerockLinkProps<Component>;
/** @deprecated Use FramerockLink. This alias preserves the same component identity. */
export const FoglampLink = FramerockLink;
/** @deprecated Use useFramerockLink. */
export const useFoglampLink = useFramerockLink;

export function useFramerockLink() {
	return React.useContext(FramerockLinkContext);
}

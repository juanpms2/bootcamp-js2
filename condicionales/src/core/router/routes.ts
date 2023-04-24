interface BaseRoutes {
  root: string;
}

const baseRoutes: BaseRoutes = {
  root: '/',
};

type SwitchRoutes = BaseRoutes;

export const switchRoutes: SwitchRoutes = {
  ...baseRoutes,
};

interface LinkRoutes extends BaseRoutes { }

export const linkRoutes: LinkRoutes = {
  ...baseRoutes,
};

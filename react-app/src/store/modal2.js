const SHOW2 = "modal/show";

const HIDE2 = "modal/hide";

const CURRENT2 = "modal/current";

const MOUNT2 = "modal/mount";

export const showModal2 = () => ({
  type: SHOW2,
});
export const hideModal2 = () => ({
  type: HIDE2,
});
export const setCurrentModal2 = (current) => ({
  type: CURRENT2,
  current
});
export const setModalMount2 = (mount) => ({
  type: MOUNT2,
  mount
});

export default function reducer(
  state = { current2: null, mount2: null, display2: false },
  action
) {
  switch (action.type) {
    case SHOW2:
      return { ...state, display: true };
    case HIDE2:
      return { ...state, display: false };
    case CURRENT2:
      return { ...state, current: action.current };
    case MOUNT2:
      return { ...state, mount: action.mount };
    default:
      return state;
  }
}

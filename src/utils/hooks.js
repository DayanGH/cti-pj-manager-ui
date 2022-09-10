import { useState, useReducer } from "react";

export function useToggleState() {
  const [state, setState] = useState(false);

  return [state, () => setState(true), () => setState(false)];
}

export function useTargetAction(action = null, item = null) {
  const [target, setTarget] = useState({ action, item });
  return [
    target.action,
    target.item,
    (action = null, item = null) => setTarget({ action, item }),
  ];
}

export function useData(initial) {
  return useReducer(
    (oldData, newData) => ({ ...oldData, ...newData }),
    initial
  );
}

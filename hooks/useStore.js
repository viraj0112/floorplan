import create from 'zustand';
import { nanoid } from 'nanoid';
// import { useState } from 'react';

const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key));
const setLocalStorage = (key, value) =>
  window.localStorage.setItem(key, JSON.stringify(value));

export const useStore =create((set) => ({
  
  cubes: getLocalStorage('world') || [],
  // takes all new cubes and prev cubes
  addCube: (x, y, z) =>
    set((state) => ({
      cubes: [
        ...state.cubes,
        { key: nanoid(), pos: [x, y, z] },
      ],
    })),
  removeCube: (x, y, z) => {
    set((state) => ({
      cubes: state.cubes.filter((cube) => {
        const [_x, _y, _z] = cube.pos;
        return _x !== x || _y !== y || _z !== z;
      }),
    }));
  },

  saveWorld: () =>
    set((state) => {
      setLocalStorage('world', state.cubes);
    }),
}));


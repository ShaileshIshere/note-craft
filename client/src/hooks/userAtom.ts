import { atom } from 'recoil';

export const userNameState = atom<string | null>({
    key: 'userNameState',
    default: null,
});

export const authLoader = atom<boolean | null>({
    key: 'authLoader',
    default: false,
})
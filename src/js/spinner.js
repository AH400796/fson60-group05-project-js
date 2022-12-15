import { Loading } from 'notiflix/build/notiflix-loading-aio';

export function addSpinner() {
    Loading.standard('Loading your movies...', {
        svgColor: '$color-accent',
        svgSize: '25px',
        backgroundColor: '$color-overlay-modal',
    });
}

export function removeSpinner() {
    Loading.remove();
}
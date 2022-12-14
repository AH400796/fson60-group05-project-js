import { Loading } from 'notiflix/build/notiflix-loading-aio';

export function addSpinner() {
    Loading.standard('Loading your movies...', {
        svgColor: '$color-accent',
        svgSize: '25px',
        backgroundColor: 'rgba(0,0,0,0.8)',
    });
}

export function removeSpinner() {
    Loading.remove();
}

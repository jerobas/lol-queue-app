import mushroom from '../../../assets/loading.svg';
import './styles.scss';

const loading = async () => {
    try {
        const svgString = (await (await fetch(mushroom)).text());
        const loadingString = /* html */ `
            <div class="relative">
                <div class="la-ball-clip-rotate la-2x">
                    <div></div>
                </div>
                <div class="spinner-svg la-2x">
                    ${svgString}
                </div>
            </div>
        `;

        const onRender = () => { }

        return [loadingString, onRender];
    } catch (error) {
        console.error(error);
    }
}

export default loading;
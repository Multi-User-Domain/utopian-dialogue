import { css } from "@emotion/css";


export const colourFadeAnimationCss = (fromColour: string, toColour: string, durationSeconds: number) => {
    return css`
            -webkit-animation-duration: ${durationSeconds}s;
            -webkit-animation-name: fading;
            animation-duration: ${durationSeconds}s;
            animation-name: fading;
            color: ${toColour};
            @-webkit-keyframes fading {
                from {
                    color: ${fromColour};
                }
                to {
                    color: ${toColour};
                }
            }
            @keyframes fading {
                from {
                    color: ${fromColour};
                }
                to {
                    color: ${toColour};
                }
            }`
}

export const fadeOutTransition = (durationSeconds: number) => {
    return css`
        visibility: hidden;
        opacity: 0;
        transition: visibility 0s ${durationSeconds}s, opacity ${durationSeconds}s linear;
    `;
}

export const growTextAnimation = (fontSize: string, durationSeconds: number) => {
    return css`
        font-size: ${fontSize};
        -webkit-animation-duration: ${durationSeconds}s;
        -webkit-animation-name: growTextToScale;
        animation-duration: ${durationSeconds}s;
        animation-name: growTextToScale;
        @keyframes createBox {
            from {
                transform: scale(0);
            }
            to {
                transform: scale(1);
            }
        }
    `;
}
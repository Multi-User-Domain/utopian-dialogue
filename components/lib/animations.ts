import { css } from "@emotion/css";


export const colourFadeAnimationCss = (fromColour: string, toColour: string, durationSeconds: number=5) => {
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

export const fadeInTransition = (durationSeconds: number) => {
    return css`
        animation-name: fadeInOpacity;
        animation-iteration-count: 1;
        animation-timing-function: ease-in;
        animation-duration: ${durationSeconds}s;
        
        @keyframes fadeInOpacity {
            0% {
                opacity: 0;
            }
            100% {
                opacity: 1;
            }
        }
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
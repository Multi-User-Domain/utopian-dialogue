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
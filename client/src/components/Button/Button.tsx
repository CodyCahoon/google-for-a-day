import React from 'react';
import './Button.scss';

export interface IButton {
    isDisabled: boolean;
    onClickFn: Function;
    text: string;
    theme: 'primary' | 'secondary';
    type: 'button' | 'submit';
}

const Button = (props: IButton) => {
    return (
        <div>
            <button
                className={'button--' + props.theme}
                type={props.type}
                disabled={props.isDisabled}
                onClick={() => {
                    if (props.isDisabled) {
                        return;
                    }
                    props.onClickFn();
                }}>
                {props.text}
            </button>
        </div>
    );
};

export default Button;

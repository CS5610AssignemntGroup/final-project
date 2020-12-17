import React, { FunctionComponent } from 'react';
import style from './style.module.css';

interface OwnProps {
    value: number;
    number?: number;
}

type Props = OwnProps;

const Rating: FunctionComponent<Props> = ({ value, number }) => {
    const starNum: number = Math.floor(value) || 0;
    const starFrac: number = value - starNum;

    return (
        <div className={style.rating}>
            <div>
                {Array.apply(null, Array(starNum)).map(i => (
                    <i style={{ color: 'orange' }} className="fas fa-star" />
                ))}
                <i
                    style={{ color: 'orange' }}
                    className={
                        starFrac === 0
                            ? ''
                            : starFrac >= 0.5
                            ? 'fas fa-star-half-alt'
                            : 'far fa-star'
                    }
                />
            </div>
            <div>{number ? `${value} from ${number} reviews` : ''}</div>
        </div>
    );
};

export { Rating };

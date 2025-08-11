// src/components/SuccessAnimation.js

import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../animations/success.json'; // <-- Asegúrate que la ruta sea correcta

const SuccessAnimation = () => {
    const style = {
        height: 150,
        width: 150,
        position: 'fixed',
    };

    return (
        <Lottie
            animationData={animationData}
            loop={false} // <-- Importante para que no se repita
            style={style}
        />
    );
};

export default SuccessAnimation;

import React from 'react';

const Total = ({ courseParts }) => {
    const calculateTotal = () => {
        const totalAmount = courseParts.reduce((total, part) => {
            return total + part.exercises;
        }, 0);

        return totalAmount;
    };

    const totalExercises = calculateTotal();

    return (
        <p>
            <strong>Total of {totalExercises} exercises</strong>
        </p>
    );
};

export default Total;

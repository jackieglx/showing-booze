import React from 'react'
import {Link, Navigate, useLoaderData} from "react-router-dom";
import axios from "axios";
import styled from 'styled-components';
import {useQuery} from "@tanstack/react-query";

const singleCocktailQuery = (id) => {
    return {
        queryKey: ['cocktail', id],
        queryFn: async () => {
            const {data} = await axios.get(`${singleCocktailUrl}${id}`);
            return data;
        }
    }
}

const singleCocktailUrl = 'https://www.thecocktaildb.com/api/json/v1/' +
    '1/lookup.php?i=';

export const loader = (queryClient) =>
    async ({params}) => {
        const {id} = params;
        // data的结构是{drinks:[{}]}
        // const {data} = await axios.get(`${singleCocktailUrl}${id}`);
        // return {id, data};
        await queryClient.ensureQueryData(singleCocktailQuery(id));
        return {id};
    };
const Cocktail = () => {
    // data的结构是{drinks:[{}]}
    // const {id, data} = useLoaderData();
    const {id} = useLoaderData();
    const {data} = useQuery(singleCocktailQuery(id))
    if (!data) {
        return <Navigate to='/'/>;
    }

    // singleDrink的结构是{}
    const singleDrink = data.drinks[0];
    const {
        strDrink: name, strDrinkThumb: image, strAlcoholic: info, strCategory: category,
        strGlass: glass, strInstructions: instructions
    } = singleDrink;

    //Object.keys(singleDrink)得到的是array，也就是[]
    const validIngredients = Object.keys(singleDrink)
        .filter((key) => {
            return key.startsWith("strIngredient") && singleDrink[key] !== null && key !== "strIngredient";
        })
        .map((key) => singleDrink[key]);

    return (
        <Wrapper>
            <header>
                <Link to='/' className='btn'>
                    back home
                </Link>
                <h3>{name}</h3>
            </header>
            <div className="drink">
                <img src={image} alt={name} className='img'/>
                <div className="drink-info">
                    <p>
                        <span className="drink-data">name :</span>
                        {name}
                    </p>
                    <p>
                        <span className="drink-data">category :</span>
                        {category}
                    </p>
                    <p>
                        <span className="drink-data">info :</span>
                        {info}
                    </p>
                    <p>
                        <span className="drink-data">glass :</span>
                        {glass}
                    </p>
                    <p>
                        <span className="drink-data">ingredients :</span>
                        {validIngredients.map((item, index) => {
                            return (
                                <span className='ing' key={item}>
                                    {item}{index < validIngredients.length - 1 ? ', ' : ''}
                                </span>
                            );
                        })}
                    </p>
                    <p>
                        <span className="drink-data">instructions :</span>
                        {instructions}
                    </p>
                </div>
            </div>
        </Wrapper>
    )
}


const Wrapper = styled.div`
    header {
        text-align: center;
        margin-bottom: 3rem;

        .btn {
            margin-bottom: 1rem;
        }
    }

    .img {
        border-radius: var(--borderRadius);
    }

    .drink-info {
        padding-top: 2rem;
    }

    .drink p {
        font-weight: 700;
        text-transform: capitalize;
        line-height: 2;
        margin-bottom: 1rem;
    }

    .drink-data {
        margin-right: 0.5rem;
        background: var(--primary-300);
        padding: 0.25rem 0.5rem;
        border-radius: var(--borderRadius);
        color: var(--primary-700);
        letter-spacing: var(--letterSpacing);
    }

    .ing {
        display: inline-block;
        margin-right: 0.5rem;
    }

    @media (min-width: 992px) {
        .drink {
            display: grid;
            grid-template-columns: 2fr 3fr;
            gap: 3rem;
            align-items: center;
        }

        .drink-info {
            padding-top: 0;
        }
    }
`;

export default Cocktail

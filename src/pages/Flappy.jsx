import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import styled from "styled-components";

import backgroundImage from '../images/background-day.png';
import pipeGreen from '../images/pipe-green.png';
import {pokemonImages} from '../assets/imageLibrary';

const BIRD_HEIGHT = 60;
const BIRD_WIDTH = 60;
const WALL_HEIGHT = 600;
const WALL_WIDTH = 400;
const GRAVITY = 8;
const OBJ_WIDTH = 52;
const OBJ_SPEED = 6;
const OBJ_GAP = 200;

function Flappy({ pokemon }) {
    const { id } = useParams(); // Récupérer l'ID du Pokémon de l'URL
    const [pokemonData, setPokemonData] = useState(pokemon || { id: parseInt(id) });
    const navigate = useNavigate();
    const [isStart, setIsStart] = useState(false);
    const [birdpos, setBirdpos] = useState(300);
    const [objHeight, setObjHeight] = useState(0);
    const [objPos, setObjPos] = useState(WALL_WIDTH);
    const [score, setScore] = useState(0);
  
    // mort tombé
    useEffect(() => {
      let intVal;
      if (isStart && birdpos < WALL_HEIGHT - BIRD_HEIGHT) {
        intVal = setInterval(() => {
          setBirdpos((birdpos) => birdpos + GRAVITY);
        }, 24);
      } else {
        setIsStart(false);
        setBirdpos(300);
        setScore(0);
      }
      return () => clearInterval(intVal);
    }, [isStart, birdpos]);
  
    // générer obstacles
    useEffect(() => {
      let objval;
      if (isStart && objPos >= -OBJ_WIDTH) {
        objval = setInterval(() => {
          setObjPos((objPos) => objPos - OBJ_SPEED);
        }, 24);
  
        return () => {
          clearInterval(objval);
        };
      } else {
        setObjPos(WALL_WIDTH);
        setObjHeight(Math.floor(Math.random() * (WALL_HEIGHT - OBJ_GAP)));
        if (isStart) setScore((score) => score + 1);
      }
    }, [isStart, objPos]);
  
    // mort cogné
    useEffect(() => {
      let topObj = birdpos >= 0 && birdpos < objHeight;
      let bottomObj =
        birdpos <= WALL_HEIGHT &&
        birdpos >=
          WALL_HEIGHT - (WALL_HEIGHT - OBJ_GAP - objHeight) - BIRD_HEIGHT;
  
      if (
        objPos >= OBJ_WIDTH &&
        objPos <= OBJ_WIDTH + 80 &&
        (topObj || bottomObj)
      ) {
        setIsStart(false);
        setBirdpos(300);
        setScore(0);
      }
    }, [isStart, birdpos, objHeight, objPos]);
  
    useEffect(() => {
      const handleKeyPress = (e) => {
        if (e.code === 'Space') {
          setIsStart(true);
          setBirdpos((prev) => prev - 30);
        }
      };
  
      window.addEventListener('keypress', handleKeyPress);
  
      return () => {
        window.removeEventListener('keypress', handleKeyPress);
      };
    }, [isStart, birdpos]);
  
    const handler = () => {
      if (!isStart) setIsStart(true);
      else if (birdpos < BIRD_HEIGHT) setBirdpos(0);
      else setBirdpos((birdpos) => birdpos - 50);
    };
  
    const handleKeyDown = (event) => {
      if (event.key === ' ' || event.key === 'Spacebar') {
        event.preventDefault();
        handler();
      }
    };

    console.log("Pokemon image URL:", pokemonImages[pokemonData.id]);
console.log("Pokemon data:", pokemonData);
  
    return (
      <div>
      <button
        onClick={() => navigate(-1)}
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          padding: "8px 12px",
          backgroundColor: "orange",
          border: "1px solid #ccc",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        ← Retour
      </button>
      
      <Home onClick={handler} onKeyDown={handleKeyDown} tabIndex="0">
        <ScoreShow>Score: {score}</ScoreShow>
        <Background height={WALL_HEIGHT} width={WALL_WIDTH}>
          {!isStart ? <Startboard>Click To Start</Startboard> : null}
          <Obj
            height={objHeight}
            width={OBJ_WIDTH}
            left={objPos}
            top={0}
            deg={180}
          />
          {pokemonData && pokemonData.id && (
            <Bird
              height={BIRD_HEIGHT}
              width={BIRD_WIDTH}
              top={birdpos}
              left={100}
              style={{ backgroundImage: `url(${pokemonImages[pokemonData.id]})` }}
            />
          )}
          <Obj
            height={WALL_HEIGHT - OBJ_GAP - objHeight}
            width={OBJ_WIDTH}
            left={objPos}
            top={WALL_HEIGHT - (objHeight + (WALL_HEIGHT - OBJ_GAP - objHeight))}
            deg={0}
          />
        </Background>
      </Home>
      </div>
    );
  }

  export default Flappy;

const Home = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Background = styled.div`
  background-image: url(${backgroundImage});
  background-repeat: no-repeat;
  background-size: ${(props) => props.width}px ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  position: relative;
  overflow: hidden;
  border: 2px solid black;
`;

const Bird = styled.div`
  position: absolute;
  background-repeat: no-repeat;
  background-size: ${(props) => props.width}px ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
`;

const Obj = styled.div`
  position: relative;
  background-image: url(${pipeGreen});
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  left: ${(props) => props.left}px;
  top: ${(props) => props.top}px;
  transform: rotate(${(props) => props.deg}deg);
`;

const Startboard = styled.div`
  position: relative;
  top: 49%;
  background-color: black;
  padding: 10px;
  width: 100px;
  left: 50%;
  margin-left: -50px;
  text-align: center;
  font-size: 20px;
  border-radius: 10px;
  color: #fff;
  font-weight: 600;
`;

const ScoreShow = styled.div`
  position: absolute;
  top: 10%;
  left: 47%;
  z-index: 1;
  font-weight: bold;
  font-size: 30px;
`;
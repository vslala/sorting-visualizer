import React, {useEffect, useState} from 'react';
import './App.css';
import './style.css';
import {VerticalBarSeries, XYPlot} from 'react-vis';

const width = 1080;
const height = 400;

const GREEN = "green";
const BLACK = "black";

function App() {

    const [bars, setBars] = useState<any>([]);
    const [arraySize, setArraySize] = useState<number>(10);
    const [speed, setSpeed] = useState<number>(600);
    let delay: number = 0;

    useEffect(() => {
        setBars(refreshBars());
    }, []);

    const refreshBars = () => {
        let arr = [];
        for (let i = 0; i < arraySize; i++) {
            let y: number = Math.floor(Math.random() * height) + 1;
            arr.push({
                x: i,
                y: y,
                color: BLACK
            });
        }
        return arr;
    }

    const refresh = () => {
        delay = 0;
        setBars(refreshBars());
    }

    const bubbleSort = async () => {
        console.log("Bubble Sorting the array...");
        let barsCopy = [...bars];
        for (let i = 0; i < barsCopy.length - 1; i++) {
            setTimeout(() => {
                barsCopy[i].color = "steelblue";
                setBars([...barsCopy]);
            }, delay += speed);

            for (let j = i + 1; j < barsCopy.length; j++) {
                setTimeout(() => {
                    barsCopy[j].color = "yellow";
                    if (barsCopy[i].y > barsCopy[j].y) {
                        barsCopy[i].color = GREEN;
                        barsCopy[j].color = GREEN;

                        swap(barsCopy, i, j);
                        setBars([...barsCopy]);
                    }

                    setBars([...barsCopy]);
                    barsCopy[j].color = BLACK;
                }, delay += speed);

            }

            setTimeout(() => {
                barsCopy[i].color = BLACK;
                setBars([...barsCopy]);
            }, delay += speed);
        }

        for (let i = 0; i < barsCopy.length; i++) {
            setTimeout(() => {
                barsCopy[i].color = "steelblue";
                setBars([...barsCopy]);
            }, delay += speed);
        }

        setBars([...barsCopy]);
    }


    const swap = (arr: any, index1: number, index2: number) => {
        let temp = arr[index1].y;
        arr[index1].y = arr[index2].y;
        arr[index2].y = temp;
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col"></div>
                    <div className="col">

                        <div className="App">
                            <XYPlot
                                width={width}
                                height={height}
                                colorType="literal"
                            >
                                <VerticalBarSeries data={bars} animation/>
                            </XYPlot>
                        </div>

                    </div>
                    <div className="col"></div>
                </div>
            </div>
            <nav className="navbar fixed-bottom navbar-light bg-light ">
                <a className="navbar-brand" href="#">Sorting Visualizer</a>
                <div className="btn-toolbar mb-3" role="toolbar" aria-label="Toolbar with button groups">
                    <label htmlFor="btn-group">Size</label><br/>
                    <div className="btn-group btn-group-sm">
                        {
                            [...new Array(6)].map((val, index) => (<div>
                                <input value={(index + 1) * 10} type="radio" id={`size_${index}`} name={"size"} className="radio"
                                       checked={index + 1 === arraySize / 10}
                                       onChange={(event)  => setArraySize(Number(event.currentTarget.value))}
                                /><br/>
                                <label htmlFor={`size_${index}`} className={"radio-label"}>{(index + 1) * 10}</label>
                            </div>))
                        }
                    </div>
                </div>
                <div className="btn-toolbar mb-3" role="toolbar" aria-label="Toolbar with button groups">
                    <label htmlFor="btn-group">Speed</label><br/>
                    {
                        [...new Array(6)].map((val, index) => (<div>
                            <input value={(6 - index)*100} type="radio" id={`speed_${index}`} name={"speed"} className="radio"
                                   checked={(6 - index)*100 === speed}
                                   onChange={(event)  => setSpeed(Number(event.currentTarget.value))}
                            /><br/>
                            <label htmlFor={`speed_${index}`} className={"radio-label"}>{index + 1}</label>
                        </div>))
                    }
                </div>
                <button type={"button"} className={"btn btn-outline-dark"} onClick={refresh}>Generate New Array</button>
                <button type={"button"} className={"btn btn-outline-dark"} onClick={bubbleSort}>Bubble Sort</button>
            </nav>
        </>

    );
}

export default App;

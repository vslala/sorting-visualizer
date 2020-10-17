import React, {useState} from 'react';
import './App.css';
import './style.css';
import {useDispatch, useSelector} from "react-redux";
import {VerticalBarSeries, XYPlot} from "react-vis";

const width = 1080;
const height = 400;

const SORT = "SORT";
const GREEN = "green";
const BLACK = "black";
const STEEL_BLUE = "steelblue";
const YELLOW = "yellow";

function App() {

    const bars: any = useSelector<any>(state => state.bars);
    const dispatch = useDispatch();

    const [arraySize, setArraySize] = useState<number>(10);
    const [speed, setSpeed] = useState<number>(600);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    let delay: number = 0;

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
        setIsRunning(true);
        console.log("refreshing...")
        delay = 0;
        dispatch({type: "REFRESH", payload: refreshBars()});
        setIsRunning(false);
    }

    const selectionSort = async () => {
        setIsRunning(true);
        console.log("Selection Sort the array...");
        let barsCopy = [...bars];
        for (let i = 0; i < barsCopy.length - 1; i++) {
            setTimeout(() => {
                barsCopy[i].color = STEEL_BLUE;
                dispatch({type: SORT, payload: [...barsCopy]});
            }, delay += speed);

            for (let j = i + 1; j < barsCopy.length; j++) {
                setTimeout(() => {
                    barsCopy[j].color = YELLOW;
                    if (barsCopy[i].y > barsCopy[j].y) {
                        barsCopy[i].color = GREEN;
                        barsCopy[j].color = GREEN;

                        swap(barsCopy, i, j);
                        dispatch({type: SORT, payload: [...barsCopy]});
                    }

                    dispatch({type: SORT, payload: [...barsCopy]});
                    barsCopy[j].color = BLACK;
                }, delay += speed);

            }

            setTimeout(() => {
                barsCopy[i].color = BLACK;
                dispatch({type: SORT, payload: [...barsCopy]});
            }, delay += speed);
        }

        paintSteelBlue(barsCopy);

        setTimeout(() => {
            setIsRunning(false);
        }, delay += speed);

        dispatch({type: SORT, payload: [...barsCopy]});
    }

    const bubbleSort = () => {
        setIsRunning(true);
        console.log("Bubble Sort the array...");
        let arr = [...bars];
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {

                setTimeout(() => {
                    arr[j].color = STEEL_BLUE;
                    arr[j + 1].color = YELLOW;
                    dispatch({type: SORT, payload: [...arr]});
                }, delay += speed);

                setTimeout(() => {
                    if (arr[j].y > arr[j + 1].y) {
                        arr[j].color = GREEN;
                        arr[j + 1].color = GREEN;
                        swap(arr, j, j + 1);
                        dispatch({type: SORT, payload: [...arr]});
                    }
                }, delay += speed);

                setTimeout(() => {
                    arr[j].color = BLACK;
                    arr[j + 1].color = BLACK;
                    dispatch({type: SORT, payload: [...arr]});
                }, delay += speed);

            }
        }

        paintSteelBlue(arr);

        setTimeout(() => {
            setIsRunning(false);
        }, delay += speed);

        console.log(arr);
        // dispatch({type: SORT, payload: [...arr]});
    }

    function paintSteelBlue(arr: any[]) {
        for (let i = 0; i < arr.length; i++) {
            setTimeout(() => {
                arr[i].color = STEEL_BLUE;
                dispatch({type: SORT, payload: [...arr]});
            }, delay += speed);
        }
    }

    const insertionSort = () => {
        setIsRunning(true);
        let arr = [...bars];
        for (let i = 0; i < arr.length; i++) {
            setTimeout(() => {
                arr[i].color = STEEL_BLUE;
                dispatch({type: SORT, payload: [...arr]})
            }, delay += speed);

            for (let j = i; j > 0; j--) {
                setTimeout(() => {
                    arr[j - 1].color = YELLOW;
                    dispatch({type: SORT, payload: [...arr]})
                }, delay += speed);

                setTimeout(() => {
                    if (arr[j].y < arr[j - 1].y) {
                        arr[j].color = GREEN;
                        arr[j - 1].color = GREEN;
                        swap(arr, j, j - 1);
                        dispatch({type: SORT, payload: [...arr]});
                    }
                }, delay += speed);


                setTimeout(() => {
                    arr[j - 1].color = BLACK;
                    dispatch({type: SORT, payload: [...arr]})
                }, delay += speed);

            }

            setTimeout(() => {
                arr[i].color = BLACK;
                dispatch({type: SORT, payload: [...arr]})
            }, delay += speed);
        }

        paintSteelBlue(arr);

        setTimeout(() => {
            setIsRunning(false);
        }, delay += speed);
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
                            [...new Array(6)].map((val, index) => (<div key={index}>
                                <input value={(index + 1) * 10} type="radio" id={`size_${index}`} name={"size"}
                                       className="radio"
                                       disabled={isRunning}
                                       checked={index + 1 === arraySize / 10}
                                       onChange={(event) => setArraySize(Number(event.currentTarget.value))}
                                /><br/>
                                <label htmlFor={`size_${index}`} className={"radio-label"}>{(index + 1) * 10}</label>
                            </div>))
                        }
                    </div>
                </div>
                <div className="btn-toolbar mb-3" role="toolbar" aria-label="Toolbar with button groups">
                    <label htmlFor="btn-group">Speed</label><br/>
                    {
                        [...new Array(6)].map((val, index) => (<div key={index}>
                            <input value={(6 - index) * 100} type="radio" id={`speed_${index}`} name={"speed"}
                                   className="radio"
                                   disabled={isRunning}
                                   checked={(6 - index) * 100 === speed}
                                   onChange={(event) => setSpeed(Number(event.currentTarget.value))}
                            /><br/>
                            <label htmlFor={`speed_${index}`} className={"radio-label"}>{index + 1}</label>
                        </div>))
                    }
                </div>
                <button type={"button"} disabled={isRunning} className={"btn btn-outline-dark"}
                        onClick={refresh}>Generate New Array
                </button>
                <button type={"button"} disabled={isRunning} className={"btn btn-outline-dark"}
                        onClick={selectionSort}>Selection Sort
                </button>
                <button type={"button"} disabled={isRunning} className={"btn btn-outline-dark"}
                        onClick={bubbleSort}>Bubble Sort
                </button>
                <button type={"button"} disabled={isRunning} className={"btn btn-outline-dark"}
                        onClick={insertionSort}>Insertion Sort
                </button>
            </nav>
        </>

    );
}

export default App;

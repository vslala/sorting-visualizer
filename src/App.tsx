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
    const [timeElapsed, setTimeElapsed] = useState<number>(0);
    const [info, setInfo] = useState<any>(<></>);

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

        console.log(arr);
        return arr;
    }

    const refresh = () => {
        setIsRunning(true);
        console.log("refreshing...")
        setTimeElapsed(0);
        dispatch({type: "REFRESH", payload: refreshBars()});
        setIsRunning(false);
    }

    const selectionSort = async () => {
        setIsRunning(true);
        let startTime = new Date().getTime();
        setInfo(<div>
            <h2>Average Time Complexity: <strong>O(n²)</strong></h2><p>Bubble sort, sometimes referred to as sinking
            sort,
            is a simple sorting algorithm that repeatedly steps through the list,
            compares adjacent elements and swaps them if they are in the wrong order.
            The pass through the list is repeated until the list is sorted.</p><p>In computer science, selection sort is
            an in-place comparison sorting algorithm.
            It has an O(n²) time complexity, which makes it inefficient on large lists,
            and generally performs worse than the similar insertion sort</p>
        </div>);


        let barsCopy = [...bars];
        for (let i = 0; i < barsCopy.length - 1; i++) {
            barsCopy[i].color = STEEL_BLUE;
            dispatch({type: SORT, payload: [...barsCopy]});
            await wait(speed);

            for (let j = i + 1; j < barsCopy.length; j++) {
                barsCopy[j].color = YELLOW;
                if (barsCopy[i].y > barsCopy[j].y) {
                    barsCopy[i].color = GREEN;
                    barsCopy[j].color = GREEN;

                    swap(barsCopy, i, j);
                    dispatch({type: SORT, payload: [...barsCopy]});
                }

                dispatch({type: SORT, payload: [...barsCopy]});
                barsCopy[j].color = BLACK;

                await wait(speed);
            }

            barsCopy[i].color = BLACK;
            dispatch({type: SORT, payload: [...barsCopy]});
            await wait(speed);
        }

        await paintSteelBlue(barsCopy);

        setIsRunning(false);
        setTimeElapsed(new Date().getTime() - startTime);
        await wait(speed);
    }

    const bubbleSort = async () => {
        setIsRunning(true);
        let startTime = new Date().getTime();
        setInfo(<div>
            <h2>Average Time Complexity: <strong>O(n²)</strong></h2>
            <p>Bubble sort, sometimes referred to as sinking sort,
                is a simple sorting algorithm that repeatedly steps through the list,
                compares adjacent elements and swaps them if they are in the wrong order.
                The pass through the list is repeated until the list is sorted.</p>
        </div>)

        let arr = [...bars];
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {

                arr[j].color = STEEL_BLUE;
                arr[j + 1].color = YELLOW;
                dispatch({type: SORT, payload: [...arr]});
                await wait(speed);

                if (arr[j].y > arr[j + 1].y) {
                    arr[j].color = GREEN;
                    arr[j + 1].color = GREEN;
                    swap(arr, j, j + 1);
                    dispatch({type: SORT, payload: [...arr]});
                }
                await wait(speed);

                arr[j].color = BLACK;
                arr[j + 1].color = BLACK;
                dispatch({type: SORT, payload: [...arr]});
                await wait(speed);

            }
        }

        await paintSteelBlue(arr);

        setIsRunning(false);
        setTimeElapsed(new Date().getTime() - startTime);
        await wait(speed);
    }

    async function paintSteelBlue(arr: any[]) {
        for (let i = 0; i < arr.length; i++) {
            arr[i].color = STEEL_BLUE;
            dispatch({type: SORT, payload: [...arr]});
            await wait(speed);
        }
    }

    const insertionSort = async () => {
        setIsRunning(true);
        let startTime = new Date().getTime();
        setInfo(<div>
            <h2>Average Time Complexity: <strong>O(n²)</strong></h2>
            <p>Insertion sort is a simple sorting algorithm that builds the final sorted array one item at a time.
                It is much less efficient on large lists than more advanced algorithms such as quicksort,
                heapsort, or merge sort. </p>
        </div>)

        let arr = [...bars];
        for (let i = 0; i < arr.length; i++) {
            arr[i].color = STEEL_BLUE;
            dispatch({type: SORT, payload: [...arr]})
            await wait(speed);

            for (let j = i; j > 0; j--) {
                arr[j - 1].color = YELLOW;
                dispatch({type: SORT, payload: [...arr]})
                await wait(speed);

                if (less(arr, j, j - 1)) {
                    arr[j].color = GREEN;
                    arr[j - 1].color = GREEN;
                    swap(arr, j, j - 1);
                    dispatch({type: SORT, payload: [...arr]});
                } else break;
                await wait(speed);

                arr[j - 1].color = BLACK;
                dispatch({type: SORT, payload: [...arr]})
                await wait(speed);
            }

            arr[i].color = BLACK;
            dispatch({type: SORT, payload: [...arr]})
            await wait(speed);
        }

        await paintSteelBlue(arr);

        await wait(speed);
        setIsRunning(false);
        setTimeElapsed(new Date().getTime() - startTime);
    }

    const quickSortOrchestrator = async () => {
        setIsRunning(true);
        let startTime = new Date().getTime();
        setInfo(<div>
            <h2>Average Time Complexity: <strong>O(n log n)</strong></h2>
            <p>Quicksort is an efficient sorting algorithm.
                Developed by British computer scientist Tony Hoare in 1959 and published in 1961,
                it is still a commonly used algorithm for sorting. When implemented well,
                it can be about two or three times faster than its main competitors,
                merge sort and heapsort.
            </p>
        </div>)

        let arr = [...bars];
        await quickSort(arr, 0, arr.length, 0, 0, 0, 0);
        await paintSteelBlue(arr);

        setIsRunning(false);
        setTimeElapsed(new Date().getTime() - startTime);
    }

    const quickSort = async (arr: any, start: number, end: number, pivot: number, randomPivot: number, i: number, j: number) => {
        if (start === end) {
            return;
        }

        arr[start].color = STEEL_BLUE;
        arr[end - 1].color = STEEL_BLUE;
        dispatch({type: SORT, payload: [...arr]});
        await wait(speed);


        randomPivot = start + randomNumber(start, end);
        arr[randomPivot].color = YELLOW;
        dispatch({type: SORT, payload: [...arr]});
        await wait(speed);


        pivot = end - 1;
        swap(arr, randomPivot, pivot);
        arr[randomPivot].color = BLACK;
        arr[pivot].color = YELLOW;
        dispatch({type: SORT, payload: [...arr]});

        await wait(speed);
        i = start;
        j = i;
        while (j < pivot) {
            if (less(arr, j, pivot)) {
                arr[j].color = GREEN;
                arr[pivot].color = GREEN;
                dispatch({type: SORT, payload: [...arr]});

                await wait(speed);
                swap(arr, i, j);
                i++;
            }
            j++;
        }

        swap(arr, i, pivot);
        arr[i].color = GREEN;
        dispatch({type: SORT, payload: [...arr]});
        await wait(speed);


        // put the pivot in its correct position
        pivot = i;

        await quickSort(arr, start, pivot, 0, 0, 0, 0);
        await quickSort(arr, pivot + 1, end, 0, 0, 0, 0);

        arr[j].color = BLACK;
        arr[pivot].color = BLACK;
        arr[start].color = BLACK;
        arr[end - 1].color = BLACK;
        dispatch({type: SORT, payload: [...arr]});
        await wait(speed);

    }

    const mergeSort = async () => {
        setIsRunning(true);
        let startTime = new Date().getTime();
        setInfo(<div>
            <h2>Average Time Complexity: <strong>O(n log n)</strong></h2>
            <p>In computer science, merge sort is an efficient,
                general-purpose, comparison-based sorting algorithm.
                Most implementations produce a stable sort, which means
                that the order of equal elements is the same in the input and output.
                Merge sort is a divide and conquer algorithm that was invented by John von Neumann in 1945.
            </p>
        </div>)

        let arr = [...bars];
        let length = arr.length;
        let aux: any[] = new Array(length);
        for (let arrSize = 1; arrSize < length; arrSize = 2 * arrSize) {
            for (let low = 0; low < length - arrSize; low = low  + (2 * arrSize)) {
                let leftIndex = low;
                let mid = low + arrSize;
                let rightIndex = mid;
                let end = Math.min(low + (2*arrSize), length);
                let auxIndex = leftIndex;

                arr[low].color = BLACK;
                arr[end  - 1].color = BLACK;
                dispatch({type: SORT, payload: [...arr]});
                await wait(speed);

                while (leftIndex < mid && rightIndex < end) {
                    if (less(arr, leftIndex, rightIndex)) aux[auxIndex++] = arr[leftIndex++];
                    else aux[auxIndex++] = arr[rightIndex++];
                }

                while (leftIndex <  mid) aux[auxIndex++] = arr[leftIndex++];
                while (rightIndex < end) aux[auxIndex++] = arr[rightIndex++];

                for (let i=low; i < end; i++) {
                    arr[i] = aux[i];
                    arr[i].x = i;

                    arr[i].color = GREEN;
                    dispatch({type: SORT, payload: [...arr]});
                    await wait(speed);
                }
            }
        }


        await paintSteelBlue(arr);
        setIsRunning(false);
        setTimeElapsed(new Date().getTime() - startTime);

    }

    const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const randomNumber = (min: number, max: number) => {
        return (Math.floor(Math.random() * (max - min)));
    }

    const less = (arr: any, index1: number, index2: number) => {
        return arr[index1].y < arr[index2].y;
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
                </div>
                <div className="row">
                    <div className="col">
                        {
                            timeElapsed > 0 ?
                                <h1>Total Time Taken = {Math.round(timeElapsed / 1000)} seconds</h1> : <></>
                        }
                        {info}
                    </div>
                </div>
            </div>
            <nav className="navbar fixed-bottom navbar-light bg-light ">
                <div className="navbar-brand">Sorting Visualizer</div>
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
                <button type={"button"} disabled={isRunning} className={"btn btn-outline-dark"}
                        onClick={quickSortOrchestrator}>Quick Sort
                </button>
                <button type={"button"} disabled={isRunning} className={"btn btn-outline-dark"}
                        onClick={mergeSort}>Merge Sort
                </button>
            </nav>
        </>

    );
}

export default App;

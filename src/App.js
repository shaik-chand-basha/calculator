import Card from "./components/ui/Card";
import style from "./App.module.css"
import { useCallback, useEffect, useRef, useState } from "react";
function App() {
	const calculator = useRef(null)
	const buttons = [1, 2, 3, 4, 5, 6, 7, 8, 9]
	const [result, setResult] = useState("0")
	const [input, setInput] = useState("0")

	const handleClickActions = useCallback((e) => {

		if (e.key?.match(/[0-9+*/%=.-]/) || ["Backspace", "Delete"].includes(e.key)) {
			let key = e.key
			if (key === "Backspace") {
				key = "Delete"
			}
			const btn = calculator.current.querySelector(`button[data-*="${key}"]`)
			if (btn) {
				btn.focus()
				btn.click()
				setTimeout(() => {
					btn.blur()
				}, 100)
			}
		}
	}, [])
	const addDecimalPoint = (e) => {
		setInput((pre) => {
			if (!pre.trim()) {
				return "0."
			}
			if(pre.indexOf(".") === -1){
				return pre;
			}
			return pre+"."
		})
	}
	const calculate = (e) => {
		const opr = e.target?.dataset.operator || e.target?.dataset.digit
		if (opr) {
			

			if (opr === "Delete") {

				setInput((pre) => {
					if (pre.trim() == "0" || pre.trim() == "" || pre.length == 1) {
						return "0";
					} else {
						pre = pre.substring(0, pre.length - 1)
						return pre;
					}
				})
				return
			}
			setInput((pre) => {
				if (pre == "0") {
					return opr;
				} else {
					return pre += opr;
				}
			}
			)
		}
	}
	useEffect(() => {
		document.addEventListener("keydown", handleClickActions)
		return () => {
			document.removeEventListener("keydown", handleClickActions)
		}
	}, [handleClickActions])
	return (
		<div className="app">
			<Card className={style["calculator"]} ref={calculator}>
				<h1 className={style.title}>Simple Calculator</h1>
				<Card className={style["display"]}>
					<span>{input}</span>
				</Card>
				<div className={style["operators"]}>
					<button onClick={calculate} className="operator" data-value="+">+</button>
					<button onClick={calculate} className="operator" data-value="-">-</button>
					<button onClick={calculate} className="operator" data-value="*">*</button>
					<button onClick={calculate} className="operator" data-value="/">/</button>
					<button onClick={calculate} className="operator" data-value="%">%</button>
					<button onClick={calculate} className="operator" data-value="Delete">DEL</button>
				</div>
				<div className={style["digits"]}>
					{buttons.map(d => <button onClick={calculate} data-digit={d} key={d}>{d}</button>)}
					<button onClick={calculate} data-digit="0">0</button>
					<button onClick={addDecimalPoint} data-decimal=".">.</button>
					<button onClick={calculate}>=</button>
				</div>
			</Card>
		</div>
	);
}

export default App;

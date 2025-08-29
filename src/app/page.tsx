"use client";

import { useEffect } from "react";
import { useState, useDerivedState, StructuredState } from "../hooks";

interface Person {
	name: string;
	age: number;
	gender: string;
}

interface InputProps {
	inputState: StructuredState<string>;
}

function Input({ inputState }: InputProps) {
	return (
		<input
			value={inputState.value}
			onChange={(e) => {
				inputState.setValue(e.target.value);
			}}
			placeholder="Enter some value"
		/>
	);
}

export default function Home() {
	const personState = useState<Person>({
		name: "John Doe",
		age: 0,
		gender: "Male",
	});

	const nameState = useDerivedState<Person, string>(
		personState,
		(person) => person.name,
		(parent, child) => ({
			...parent,
			name: child,
		})
	);

	const genderState = useDerivedState<Person, string>(
		personState,
		(person) => person.gender,
		(parent, child) => ({
			...parent,
			gender: child,
		})
	);

	useEffect(() => {
		console.log("Person state changed:", personState.value);
	}, [personState.value]);

	return (
		<div>
			<Input inputState={nameState} />
			<Input inputState={genderState} />
		</div>
	);
}

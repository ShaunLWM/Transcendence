import {useEffect, useState} from "react";
import Realm from "realm";
import {TransactionSchema} from "../models/TransactionModel";

export default function useDatabase() {
	const [database, setDatabase] = useState<Realm>();

	useEffect(() => {
		async function start() {
			console.log(`[realm] starting..`);
			try {
				const db = await Realm.open({
					path: "myrealm",
					schema: [TransactionSchema],
				});
				setDatabase(db);
			} catch (error) {
				console.log(`[realm] failed to open ${error}`);
			}
		}

		console.log(`[realm] on mount`);
		start();
		return () => {
			console.log(`[realm] closing..`);
			database?.close();
		};
	}, [database]);

	return database;
}

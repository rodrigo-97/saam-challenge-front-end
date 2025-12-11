type TableProps<T> = {
	columns: string[];
	data: T[];
	renderRow: (item: T, index: number) => React.ReactNode;
};

export const Table = <T,>({ columns, data, renderRow }: TableProps<T>) => {
	return (
		<div className="overflow-x-auto">
			<table className="table table-sm w-full table-hover">
				<thead>
					<tr>
						{columns.map((col) => (
							<th key={col}>{col}</th>
						))}
					</tr>
				</thead>
				<tbody>{data.map((item, index) => renderRow(item, index))}</tbody>
			</table>
		</div>
	);
};

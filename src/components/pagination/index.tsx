import {
	CaretDoubleLeftIcon,
	CaretDoubleRightIcon,
	CaretLeftIcon,
	CaretRightIcon,
} from "@phosphor-icons/react";

interface Props<T> {
	pagination: Pagination<T>["pagination"];
	onPageChange: (page: number) => void;
}

export const Pagination = <T,>({ pagination, onPageChange }: Props<T>) => {
	const { currentPage, totalPages } = pagination;

	const previousPage = currentPage > 1 ? currentPage - 1 : null;
	const nextPage = currentPage < totalPages ? currentPage + 1 : null;

	const getVisiblePages = () => {
		const maxButtons = window.innerWidth < 768 ? 3 : 5; // 3 botões em mobile, 5 em desktop

		const start = Math.max(
			1,
			Math.min(
				currentPage - Math.floor(maxButtons / 2),
				totalPages - (maxButtons - 1),
			),
		);

		const end = Math.min(totalPages, start + maxButtons - 1);

		return Array.from({ length: end - start + 1 }, (_, i) => start + i);
	};

	const visiblePages = getVisiblePages();

	return (
		<div className="flex justify-center w-full overflow-x-auto">
			<div className="join join-horizontal ">
				<button
					type="button"
					className="btn join-item btn-sm lg:btn-md"
					disabled={currentPage === 1}
					onClick={() => onPageChange(1)}
				>
					<CaretDoubleLeftIcon weight="bold" />
				</button>

				<button
					type="button"
					className="btn join-item btn-sm lg:btn-md"
					disabled={!previousPage}
					onClick={() => previousPage && onPageChange(previousPage)}
				>
					<CaretLeftIcon weight="bold" />
				</button>

				{visiblePages.map((page) => (
					<button
						key={page}
						type="button"
						className={`btn join-item btn-sm lg:btn-md ${
							page === currentPage ? "btn-active" : ""
						}`}
						onClick={() => onPageChange(page)}
					>
						{page}
					</button>
				))}

				<button
					type="button"
					className="btn join-item btn-sm lg:btn-md"
					disabled={!nextPage}
					onClick={() => nextPage && onPageChange(nextPage)}
				>
					<CaretRightIcon weight="bold" />
				</button>

				<button
					type="button"
					className="btn join-item btn-sm lg:btn-md"
					disabled={currentPage === totalPages}
					onClick={() => onPageChange(totalPages)}
				>
					<CaretDoubleRightIcon weight="bold" />
				</button>
			</div>
		</div>
	);
};

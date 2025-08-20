import type { ReactNode } from 'react'
import { Skeleton } from './Skeleton'

export type TableColumn<T> = {
	key: string
	header: ReactNode
	cell: (row: T) => ReactNode
	headerClassName?: string
	cellClassName?: string
	hiddenOnMobile?: boolean
}

export type TableProps<T> = {
	columns: TableColumn<T>[]
	data: T[] | null
	getRowKey: (row: T) => string | number
	loading?: boolean
	emptyText?: string
	onRowClick?: (row: T) => void
	ariaLabel?: string
}

export function Table<T>({ columns, data, getRowKey, loading, emptyText, onRowClick, ariaLabel }: TableProps<T>) {
	const isEmpty = !loading && (!data || data.length === 0)

	return (
		<div>
			{/* Desktop/tablet table */}
			<div className="hidden sm:block overflow-x-auto rounded-lg border border-neutral-200/60 dark:border-neutral-800/60 bg-white dark:bg-neutral-900">
				<table className="w-full text-sm" aria-label={ariaLabel} aria-busy={loading ? 'true' : undefined}>
					<thead className="text-left">
						<tr className="border-b border-neutral-200/60 dark:border-neutral-800/60">
							{columns.map(col => (
								<th key={col.key} scope="col" className={`px-4 py-3 font-semibold ${col.headerClassName || ''}`}>{col.header}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{loading ? (
							[0,1,2].map(i => (
								<tr key={`skeleton-${i}`} className="border-b border-neutral-200/60 dark:border-neutral-800/60">
									<td colSpan={columns.length} className="px-4 py-3"><Skeleton className="h-4 w-full" /></td>
								</tr>
							))
						) : isEmpty ? (
							<tr>
								<td colSpan={columns.length} className="px-4 py-6 text-center opacity-70">{emptyText || '데이터가 없습니다.'}</td>
							</tr>
						) : (
							(data || []).map(row => (
								<tr key={getRowKey(row)}
									className={`border-b border-neutral-200/60 dark:border-neutral-800/60 ${onRowClick ? 'cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800/60' : ''}`}
									onClick={() => onRowClick && onRowClick(row)}
								>
									{columns.map(col => (
										<td key={col.key} className={`px-4 py-3 ${col.cellClassName || ''}`}>{col.cell(row)}</td>
									))}
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>

			{/* Mobile stacked cards */}
			<div className="sm:hidden space-y-3">
				{loading ? (
					[0,1,2].map(i => (
						<div key={`ms-${i}`} className="rounded-lg border border-neutral-200/60 dark:border-neutral-800/60 p-4 bg-white dark:bg-neutral-900">
							<Skeleton className="h-4 w-2/3" />
							<Skeleton className="h-4 w-1/3 mt-2" />
						</div>
					))
				) : isEmpty ? (
					<p className="text-sm opacity-70">{emptyText || '데이터가 없습니다.'}</p>
				) : (
					(data || []).map(row => (
						<div key={getRowKey(row)}
							className={`rounded-lg border border-neutral-200/60 dark:border-neutral-800/60 p-4 bg-white dark:bg-neutral-900 ${onRowClick ? 'cursor-pointer' : ''}`}
							onClick={() => onRowClick && onRowClick(row)}
						>
							{columns.filter(c => !c.hiddenOnMobile).map(col => (
								<div key={col.key} className="flex items-start justify-between py-1.5">
									<div className="text-xs opacity-70 mr-4">{col.header}</div>
									<div className="text-sm">{col.cell(row)}</div>
								</div>
							))}
						</div>
					))
				)}
			</div>
		</div>
	)
}



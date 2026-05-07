import { computed, signal, Signal } from "@angular/core"

export function useTableHandler<T>(
	dataSignal: Signal<T[]>,
	searchFields: (keyof T)[]
) {
	const searchTerm = signal('')
	const sortCol = signal<keyof T | ''>('')
	const isAsc = signal<boolean>(true)

	const filteredData = computed(() => {
		const term = searchTerm().toLowerCase().trim()
		const col = sortCol()
		const asc = isAsc()
		let list = dataSignal()

		if (term) {
			list = list.filter((item) =>
				searchFields.some((field) =>
					String(item[field]).toLowerCase().includes(term)
				)
			)
		}

		if (!col) return list

		return [...list].sort((a, b) => {
			const valA = a[col]
			const valB = b[col]

			if (valA === valB) return 0
			const order = valA < valB ? -1 : 1
			return asc ? order : -order
		})
	})

	const toggleSort = (col: keyof T) => {
		if (sortCol() === col) isAsc.update(val => !val)
		else {
			sortCol.set(col)
			isAsc.set(true)
		}
	}

	return {
		searchTerm,
		sortCol,
		isAsc,
		filteredData,
		toggleSort
	}
}

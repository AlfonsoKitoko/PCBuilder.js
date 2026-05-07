import { CommonModule, CurrencyPipe } from '@angular/common'
import { Component, computed, inject } from '@angular/core'
import { Router, RouterModule } from '@angular/router'
import { UserService } from '../../../../shared/services/user.service'
import { AuthService } from '../../../../shared/services/auth.service'
import { ModalService } from '../../../../shared/services/modal.service'
import { ToastService } from '../../../../shared/services/toast.service'
import { useTableHandler } from '../../../../shared/utils/table-handler.util'
import { userProfile } from '../../../../shared/models/user.model'

@Component({
	selector: 'app-users',
	imports: [CommonModule, RouterModule],
	templateUrl: './users.html',
})
export default class Users {
	private readonly router = inject(Router)
	private readonly userService = inject(UserService)
	private readonly authService = inject(AuthService)
	private readonly modal = inject(ModalService)
	private readonly toast = inject(ToastService)

	tableHandler = useTableHandler(
		this.userService.users, [
		'username', 'firstName', 'lastName',
		'email', 'birthDate', 'profile'
	])

	users = this.tableHandler.filteredData
	searchTerm = this.tableHandler.searchTerm
	isLoading = this.userService.isLoading

	user = computed(() => this.authService.user())
	managementRoles = [userProfile.ADMIN]

	ngOnInit() { this.userService.getAll() }

	goToDetail(id: string | undefined) {
		if (!id) return
		this.router.navigate(['/user', id])
	}
}

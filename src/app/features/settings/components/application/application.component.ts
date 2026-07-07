import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { AuthStore } from '../../../../core/auth/store/auth.store';
import { Application, ApplicationDocument } from '../../../organization/models/application.model';
import { Organization } from '../../../organization/models/organization.model';
import { OrganizationService } from '../../../organization/services/organization.service';

interface DocumentType {
	label: string;
	value: number;
	field: keyof Pick<
		Application,
		'articleOfAssociation' | 'commercialRegistration' | 'registeredAddressProof' | 'taxCard'
	>;
}

@Component({
	selector: 'app-application',
	imports: [
		ReactiveFormsModule,
		DatePipe,
		TagModule,
		ChipModule,
		ButtonModule,
		DialogModule,
		InputTextModule,
		DatePickerModule,
		ToastModule,
		ProgressSpinnerModule,
	],
	providers: [MessageService],
	templateUrl: './application.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationComponent implements OnInit {
	private readonly _organizationService = inject(OrganizationService);
	private readonly _messageService = inject(MessageService);
	private readonly _authStore = inject(AuthStore);

	protected readonly application = signal<Application | null>(null);
	protected readonly organizationDetails = signal<Organization | null>(null);
	protected readonly isLoading = signal(true);
	protected readonly error = signal<string | null>(null);
	protected readonly uploadingDoc = signal(false);
	protected readonly orgLoading = signal(false);

	protected readonly dialogVisible = signal(false);
	protected readonly selectedDocType = signal<DocumentType | null>(null);
	protected readonly selectedFile = signal<File | null>(null);

	protected readonly uploadForm = new FormGroup({
		// eslint-disable-next-line @typescript-eslint/unbound-method
		officialName: new FormControl('', [Validators.required]),
		// eslint-disable-next-line @typescript-eslint/unbound-method
		expiryDate: new FormControl<Date | null>(null, [Validators.required]),
	});

	protected readonly documentTypes: DocumentType[] = [
		{ label: 'Article of Association', value: 0, field: 'articleOfAssociation' },
		{ label: 'Commercial Registration', value: 1, field: 'commercialRegistration' },
		{ label: 'Registered Address Proof', value: 2, field: 'registeredAddressProof' },
		{ label: 'Tax Card', value: 3, field: 'taxCard' },
	];

	public get officialNameControl(): FormControl<string | null> {
		return this.uploadForm.controls.officialName;
	}

	public get expiryDateControl(): FormControl<Date | null> {
		return this.uploadForm.controls.expiryDate;
	}

	public ngOnInit(): void {
		this._loadApplication();
	}

	private _loadApplication(): void {
		this._organizationService.getApplication().subscribe({
			next: (app) => {
				this.application.set(app);
				this.isLoading.set(false);
				if (app.status === 'Accepted') {
					this._loadOrganizationDetails();
				}
			},
			error: () => {
				this.error.set('Failed to load application data.');
				this.isLoading.set(false);
			},
		});
	}

	private _loadOrganizationDetails(): void {
		this.orgLoading.set(true);
		this._organizationService.getOrganization().subscribe({
			next: (org) => {
				this.organizationDetails.set(org);
				this.orgLoading.set(false);
			},
			error: () => {
				this.orgLoading.set(false);
			},
		});
	}

	protected openUploadDialog(docType: DocumentType): void {
		this.selectedDocType.set(docType);
		this.selectedFile.set(null);
		this.uploadForm.reset();
		this.dialogVisible.set(true);
	}

	protected onFileChange(event: Event): void {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0] ?? null;
		this.selectedFile.set(file);
		input.value = '';
	}

	protected onSubmitUpload(): void {
		this.uploadForm.markAllAsTouched();
		if (this.uploadForm.invalid || !this.selectedFile() || !this.selectedDocType()) return;

		const app = this.application();
		if (!app) return;

		const { officialName, expiryDate } = this.uploadForm.getRawValue();
		const dob = expiryDate!;
		const year = dob.getFullYear();
		const month = String(dob.getMonth() + 1).padStart(2, '0');
		const day = String(dob.getDate()).padStart(2, '0');

		this.uploadingDoc.set(true);

		this._organizationService
			.uploadDocument(
				app.id,
				this.selectedDocType()!.value,
				this.selectedFile()!,
				officialName ?? '',
				`${year}-${month}-${day}T00:00:00.000Z`,
			)
			.subscribe({
				next: () => {
					this._messageService.add({
						severity: 'success',
						summary: 'Uploaded',
						detail: `${this.selectedDocType()!.label} uploaded successfully.`,
						life: 3000,
					});
					this.dialogVisible.set(false);
					this.uploadingDoc.set(false);
					this._loadApplication();
				},
				error: (err: { error?: { message?: string } }) => {
					this._messageService.add({
						severity: 'error',
						summary: 'Upload Failed',
						detail: err?.error?.message ?? `Unable to upload ${this.selectedDocType()!.label}.`,
						life: 5000,
					});
					this.uploadingDoc.set(false);
				},
			});
	}

	protected getDoc(doc: DocumentType): ApplicationDocument | null {
		const app = this.application();
		if (!app) return null;
		return app[doc.field] ?? null;
	}

	protected getDocFileName(doc: DocumentType): string | null {
		const docData = this.getDoc(doc);
		return docData?.media?.fileName ?? null;
	}

	protected formatDate(dateStr: string): string {
		const d = new Date(dateStr);
		return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
	}

	protected downloadDocument(doc: DocumentType): void {
		const docData = this.getDoc(doc);
		if (!docData) return;

		this._organizationService.downloadDocument(docData.id).subscribe({
			next: (blob) => {
				const url = URL.createObjectURL(blob);
				const a = document.createElement('a');
				a.href = url;
				a.download = docData.media.fileName;
				a.click();
				URL.revokeObjectURL(url);
			},
			error: () => {
				this._messageService.add({
					severity: 'error',
					summary: 'Download Failed',
					detail: 'Unable to download the document.',
					life: 3000,
				});
			},
		});
	}

	protected redirectToOwnerCallback(subDomain: string): void {
		const refreshToken = this._authStore.refreshToken();
		if (refreshToken) {
			window.open(
				`https://${subDomain}.localhost:80/auth/owner/callback?refreshToken=${encodeURIComponent(refreshToken)}`,
				'_blank',
			);
		}
	}

	protected getStatusSeverity(
		status: string,
	): 'success' | 'warn' | 'danger' | 'info' | 'secondary' | 'contrast' {
		switch (status) {
			case 'Accepted':
				return 'success';
			case 'Pending':
				return 'warn';
			case 'Rejected':
				return 'danger';
			default:
				return 'info';
		}
	}
}

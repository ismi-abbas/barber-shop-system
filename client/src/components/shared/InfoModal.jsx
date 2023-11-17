import { Dialog, Transition } from "@headlessui/react";
import { format } from "date-fns";
import { Fragment } from "react";

export default function InfoModal({
	title,
	description,
	closeModal,
	isOpen,
	isConfirmed,
	info
}) {
	return (
		<div>
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black/25" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
									<Dialog.Title
										as="h3"
										className="text-lg font-medium leading-6 text-gray-900"
									>
										{title}
									</Dialog.Title>

									<Dialog.Description>
										<div className="mt-2">
											<p className="text-sm text-gray-500">{description}</p>
										</div>
										<div className="mt-2 w-full text-sm text-gray-500">
											<p>Service: {info.serviceName}</p>
											<p>Price: RM {info.price}</p>
											<p>Barber: {info.barberName}</p>
											<p>Date: {format(new Date(info.date), "dd-MMM-yy")}</p>
											<p>Time: {format(new Date(info.date), "hh:mm aa")}</p>
										</div>
									</Dialog.Description>

									<div className="mt-4 gap-2 flex justify-end">
										<button
											onClick={isConfirmed}
											type="button"
											className="inline-flex justify-center rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
										>
											Confirm
										</button>
										<button
											type="button"
											className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
											onClick={closeModal}
										>
											Cancel
										</button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</div>
	);
}

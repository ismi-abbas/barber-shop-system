import { useState } from "react";
import Layout from "../components/shared/Layout";

const Contacts = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");

	const handleFeedback = () => {
		console.log({
			name,
			email,
			message
		});
	};

	return (
		<Layout>
			<section className="text-gray-600 body-font relative">
				<div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
					<div className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
						<iframe
							width="100%"
							height="100%"
							className="absolute inset-0"
							title="map"
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7967.60478261145!2d101.69339414597376!3d3.1467845373144927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc49d3e30988d7%3A0x464a4b7fda23c09a!2sKuala%20Lumpur%20City%20Centre%2C%20Kuala%20Lumpur%2C%20Federal%20Territory%20of%20Kuala%20Lumpur!5e0!3m2!1sen!2smy!4v1699772861339!5m2!1sen!2smy"
						/>
						<div className="bg-white relative flex flex-wrap py-6 rounded shadow-md">
							<div className="lg:w-1/2 px-6">
								<h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
									ADDRESS
								</h2>
								<p className="mt-1">
									BarberBook.co, Inc. No 123 Jalan Tun Abdul Samad, KLCC.
								</p>
							</div>
							<div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
								<h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
									EMAIL
								</h2>
								<a className="text-indigo-500 leading-relaxed">
									barberbook@email.com
								</a>
								<h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">
									PHONE
								</h2>
								<p className="leading-relaxed">123-456-7890</p>
							</div>
						</div>
					</div>
					<div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
						<h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
							Contact Us
						</h2>
						<p className="leading-relaxed mb-5 text-gray-600">
							Contact us on any feedback needed
						</p>
						<div className="relative mb-4">
							<label htmlFor="name" className="leading-7 text-sm text-gray-600">
								Name
							</label>
							<input
								value={name}
								onChange={(e) => setName(e.target.value)}
								type="text"
								id="name"
								name="name"
								className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
							/>
						</div>
						<div className="relative mb-4">
							<label
								htmlFor="email"
								className="leading-7 text-sm text-gray-600"
							>
								Email
							</label>
							<input
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								type="email"
								id="email"
								name="email"
								className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
							/>
						</div>
						<div className="relative mb-4">
							<label
								htmlFor="message"
								className="leading-7 text-sm text-gray-600"
							>
								Message
							</label>
							<textarea
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								id="message"
								name="message"
								className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
							/>
						</div>
						<button
							onClick={() => handleFeedback()}
							className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
						>
							Send
						</button>
						<p className="text-xs text-gray-500 mt-3">
							Chicharrones blog helvetica normcore iceland tousled brook viral
							artisan.
						</p>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default Contacts;

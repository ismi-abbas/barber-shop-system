import Layout from "../components/shared/Layout";
import { Link } from "react-router-dom";

const Features = () => {
	return (
		<Layout>
			<section className="text-gray-600 body-font">
				<div className="container px-5 mx-auto">
					<div className="text-center mb-20">
						<h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">
							Discover Your Unique Style
						</h1>
						<p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">
							Transform your look with our skilled barbers and trendy styles.
							Experience grooming like never before at BarberBook.co.
						</p>
						<div className="flex mt-6 justify-center">
							<div className="w-16 h-1 rounded-full bg-indigo-500 inline-flex" />
						</div>
					</div>
					<div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
						<div className="p-4 md:w-1/3 flex flex-col text-center items-center">
							<div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
								<svg
									fill="none"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									className="w-10 h-10"
									viewBox="0 0 24 24"
								>
									<path d="M22 12h-4l-3 9L9 3l-3 9H2" />
								</svg>
							</div>
							<div className="flex-grow">
								<h2 className="text-gray-900 text-lg title-font font-medium mb-3">
									Stylish Haircuts
								</h2>
								<p className="leading-relaxed text-base">
									Choose from a variety of stylish haircuts to suit your
									personality. Our skilled barbers are here to bring your vision
									to life.
								</p>
								<a className="mt-3 text-indigo-500 inline-flex items-center">
									Explore Styles
									<svg
										fill="none"
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										className="w-4 h-4 ml-2"
										viewBox="0 0 24 24"
									>
										<path d="M5 12h14M12 5l7 7-7 7" />
									</svg>
								</a>
							</div>
						</div>
						<div className="p-4 md:w-1/3 flex flex-col text-center items-center">
							<div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
								<svg
									fill="none"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									className="w-10 h-10"
									viewBox="0 0 24 24"
								>
									<circle cx={6} cy={6} r={3} />
									<circle cx={6} cy={18} r={3} />
									<path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12" />
								</svg>
							</div>
							<div className="flex-grow">
								<h2 className="text-gray-900 text-lg title-font font-medium mb-3">
									The Perfect Shave
								</h2>
								<p className="leading-relaxed text-base">
									Indulge in a luxurious shaving experience. Our barbers provide
									precision and care for the perfect shave, leaving you
									refreshed.
								</p>
								<a className="mt-3 text-indigo-500 inline-flex items-center">
									Discover Shaving
									<svg
										fill="none"
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										className="w-4 h-4 ml-2"
										viewBox="0 0 24 24"
									>
										<path d="M5 12h14M12 5l7 7-7 7" />
									</svg>
								</a>
							</div>
						</div>
						<div className="p-4 md:w-1/3 flex flex-col text-center items-center">
							<div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
								<svg
									fill="none"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									className="w-10 h-10"
									viewBox="0 0 24 24"
								>
									<path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
									<circle cx={12} cy={7} r={4} />
								</svg>
							</div>
							<div className="flex-grow">
								<h2 className="text-gray-900 text-lg title-font font-medium mb-3">
									Quality Products
								</h2>
								<p className="leading-relaxed text-base">
									Explore our curated collection of grooming products. From
									premium hair care to beard essentials, we have it all.
								</p>
								<a className="mt-3 text-indigo-500 inline-flex items-center">
									Shop Now
									<svg
										fill="none"
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										className="w-4 h-4 ml-2"
										viewBox="0 0 24 24"
									>
										<path d="M5 12h14M12 5l7 7-7 7" />
									</svg>
								</a>
							</div>
						</div>
					</div>
					<button className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
						<Link to="/login">Book an Appointment</Link>
					</button>
				</div>
			</section>
		</Layout>
	);
};

export default Features;

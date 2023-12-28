import Layout from "../components/shared/Layout";

const BarberBookReviews = () => {
	return (
		<Layout>
			<div className="flex flex-col items-center justify-center">
				<h1 className="sm:text-3xl text-2xl font-medium text-gray-900 mb-4">
					Customer Reviews
				</h1>
				<section className="text-gray-600 body-font">
					<div className="container px-5 py-24 mx-auto">
						<div className="flex flex-wrap -m-4">
							<div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
								<div className="h-full text-center">
									<img
										alt="testimonial"
										className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
										src="https://dummyimage.com/302x302"
									/>
									<p className="leading-relaxed">
										&quot;BarberBook made grooming convenient and enjoyable for
										BarberBook made grooming convenient and enjoyable for me.
										The barbers are skilled, and the atmosphere is welcoming. I
										always leave satisfied with my haircut.&quot;
									</p>
									<span className="inline-block h-1 w-10 rounded bg-indigo-500 mt-6 mb-4" />
									<h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">
										Gojo Satoru
									</h2>
									<p className="text-gray-500">Satisfied Customer</p>
								</div>
							</div>
							<div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
								<div className="h-full text-center">
									<img
										alt="testimonial"
										className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
										src="https://dummyimage.com/300x300"
									/>
									<p className="leading-relaxed">
										&quot;I&apos;ve been using BarberBook for a year now, and
										I&apos;ve never been disappointed. The app is user-friendly,
										and the barbers are professional. Highly recommend!&quot;
									</p>
									<span className="inline-block h-1 w-10 rounded bg-indigo-500 mt-6 mb-4" />
									<h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">
										John Wick
									</h2>
									<p className="text-gray-500">Regular Client</p>
								</div>
							</div>
							<div className="lg:w-1/3 lg:mb-0 p-4">
								<div className="h-full text-center">
									<img
										alt="testimonial"
										className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
										src="https://dummyimage.com/305x305"
									/>
									<p className="leading-relaxed">
										&quot;BarberBook has revolutionized my grooming routine.
										Easy booking, great service, and the barbers pay attention
										to detail. Best grooming platform!&quot;
									</p>
									<span className="inline-block h-1 w-10 rounded bg-indigo-500 mt-6 mb-4" />
									<h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">
										Michael Jackson
									</h2>
									<p className="text-gray-500">Happy Customer</p>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</Layout>
	);
};

export default BarberBookReviews;

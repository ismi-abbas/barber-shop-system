import Layout from "../components/shared/Layout";
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<Layout>
			<div className="flex flex-col items-center justify-center h-full">
				<div className="text-5xl text-zinc-900">
					Welcome to{" "}
					<span className="underline decoration-indigo-500">BarberBook.co</span>
				</div>
				<section className="text-gray-600 body-font">
					<div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
						<div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
							<h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
								Elevate Your Style Journey
								<br className="hidden lg:inline-block" />
								Discover, Connect, and Book with BarberBook.co
							</h1>
							<p className="mb-8 leading-relaxed">
								Embark on a grooming experience like never before. BarberBook.co
								brings you a seamless platform to book your favorite barber with
								ease. From trendy haircuts to classic styles, we&apos;re here to
								transform your look and enhance your confidence.
							</p>
							<div className="flex justify-center">
								<Link to="/book">
									<button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
										Book Now
									</button>
								</Link>

								<Link to={"/about"}>
									<button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
										Learn More
									</button>
								</Link>
							</div>
						</div>
						<div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
							<img
								height={720}
								width={600}
								className="object-cover object-center rounded h-[300px]"
								alt="hero"
								src="https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							/>
						</div>
					</div>
				</section>
			</div>
		</Layout>
	);
};

export default Home;

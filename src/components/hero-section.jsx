"use-client";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import EMICalculator from "./emiCal";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";

const packages = [
  {
    title: "Romantic Maldives",
    subtitle: "Romantic Maldives Escape",
    duration: "4 Nights / 5 Days",
    price: "₹1,50,000",
    priceLabel: "per couple",
    image: "/maldives.png",
  },
  {
    title: "Mystical Leh",
    subtitle: "Mystical Leh Adventure",
    duration: "6 Nights / 7 Days",
    price: "₹80,000",
    priceLabel: "per person",
    image: "/leh.png",
  },
  {
    title: "Royal Rajasthan",
    subtitle: "Royal Rajasthan Tour",
    duration: "5 Nights / 6 Days",
    price: "₹65,000",
    priceLabel: "per person",
    image: "/rajasthan.png",
  },
  {
    title: "Exotic Thailand",
    subtitle: "Exotic Thailand Fun",
    duration: "4 Nights / 5 Days",
    price: "₹95,000",
    priceLabel: "per couple",
    image: "/thailand.png",
  },
  {
    title: "Exotic Thailand",
    subtitle: "Exotic Thailand Fun",
    duration: "4 Nights / 5 Days",
    price: "₹95,000",
    priceLabel: "per couple",
    image: "/thailand.png",
  },
  {
    title: "Exotic Thailand",
    subtitle: "Exotic Thailand Fun",
    duration: "4 Nights / 5 Days",
    price: "₹95,000",
    priceLabel: "per couple",
    image: "/thailand.png",
  },
  {
    title: "Exotic Thailand",
    subtitle: "Exotic Thailand Fun",
    duration: "4 Nights / 5 Days",
    price: "₹95,000",
    priceLabel: "per couple",
    image: "/thailand.png",
  },
  {
    title: "Exotic Thailand",
    subtitle: "Exotic Thailand Fun",
    duration: "4 Nights / 5 Days",
    price: "₹95,000",
    priceLabel: "per couple",
    image: "/thailand.png",
  },
  {
    title: "Exotic Thailand",
    subtitle: "Exotic Thailand Fun",
    duration: "4 Nights / 5 Days",
    price: "₹95,000",
    priceLabel: "per couple",
    image: "/thailand.png",
  },
];

const HeroSection = () => {
  return (
    <main>
      <section className="heroSection h-[730px] md:h-[650px] bg-custom-gradient flex flex-col lg:flex-row items-center justify-evenly">
        <div className="left px-8 md:py-6 lg:py-12  ">
          {/* travora headline */}
          <div className=" lg:full">
            <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl">
              Book Your Trip Now, <span className="text-blue-700">Pay </span>{" "}
              <br />
              <span className="text-blue-700">Later.</span>
            </h1>
            <p className="mt-4 md:mt-8 font-semibold md:text-2xl lg:text-3xl md:w-[700px]">
              Flexible EMI travel payments. 100% verified agents. Zero hassle.
              Your dream vacation is a just a click away
            </p>
          </div>

          {/* buttons - get started and agent */}
          <div className="flex space-x-8 mt-8 md:mt-8 lg:mt-20 ">
            <div>
              <Button size="md" className="bg-blue-700 text-white rounded-2xl ">
                Get Started
              </Button>
            </div>
            <div>
              <Button size="mdl" className="bg-gray-300  rounded-2xl border-2 ">
                Become an Agent
              </Button>
            </div>
          </div>
        </div>

        <div className="right mt-4 md:-mt-6 lg:-mb-56">
          <Image
            className="  w-[410px] h-[440px] md:w-[450px] md:h-[480px] lg:w-[686px] lg:h-[650px] "
            src={"/Trip-pana.png"}
            alt="photo"
            width={"686"}
            height={"686"}
          />
        </div>
      </section>

      <section className="w-full flex items-center justify-center  mt-48 mb-24  ">
        <div className="middle text-center">
          <h1 className="font-semibold text-5xl">Travel in 3 Easy Steps</h1>
          <p className="mt-3 text-lg text-blue-500 md:w-[510px]">
            A simple and transparent process to get you on your way.
          </p>
        </div>
      </section>

      {/* how it works */}

      <section className="bg-softBlue  w-full py-8 px-4">
        <div className="flex flex-col md:flex-row flex-wrap items-center justify-evenly gap-6">
          {/* Step 1: Choose your package */}
          <div className="text-center w-full sm:w-[350px] md:w-[300px] lg:w-[350px] px-4 py-6">
            <Image
              className="mx-auto w-[60px] md:w-[80px]"
              src="/goods.png"
              alt="goods"
              width={80}
              height={80}
            />
            <h1 className="mt-4 text-2xl md:text-3xl font-bold">
              1. Choose Your Package
            </h1>
            <p className="mt-2 text-base md:text-lg ">
              Browse thousands of trips from our network of verified travel
              agents.
            </p>
          </div>

          {/* Step 2: Complete KYC */}
          <div className="text-center w-full sm:w-[350px] md:w-[300px] lg:w-[350px] px-4 py-6 ">
            <Image
              className="mx-auto w-[60px] md:w-[80px]"
              src="/customer.png"
              alt="customer"
              width={80}
              height={80}
            />
            <h1 className="mt-4 text-2xl md:text-3xl font-bold">
              2. Complete Instant KYC
            </h1>
            <p className="mt-2 text-base md:text-lg">
              A quick and secure digital verification to get you approved.
            </p>
          </div>

          {/* Step 3: Travel Now */}
          <div className="text-center w-full sm:w-[350px] md:w-[300px] lg:w-[350px] px-4 py-6 ">
            <Image
              className="mx-auto w-[60px] md:w-[80px]"
              src="/pay.png"
              alt="pay"
              width={80}
              height={80}
            />
            <h1 className="mt-4 text-2xl md:text-3xl font-bold">
              3. Travel Now, Pay Later
            </h1>
            <p className="mt-2 text-base md:text-lg ">
              Enjoy your trip without any upfront payment. Pay in easy EMIs
              after you return.
            </p>
          </div>
        </div>
      </section>

      <div className="text-center px-4 mt-12">
        <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl leading-tight">
          Why Choose <span className="text-blue-700">Pay Later</span>?
        </h1>
      </div>

      {/* why choose paylater */}

      <section className="mt-8 py-8 px-4">
        <div className="flex flex-col md:flex-row flex-wrap justify-evenly items-stretch gap-6">
          {/* Zero Upfront Cost */}
          <div className="text-center w-full sm:w-[350px] md:w-[300px] p-4  ">
            <Image
              className="mx-auto w-[60px] md:w-[70px]"
              src="/goods.png"
              alt="goods"
              width={70}
              height={70}
            />
            <h1 className="mt-4 text-lg md:text-xl font-bold">
              Zero Upfront Cost
            </h1>
            <p className="mt-2 text-base md:text-lg ">
              Book anything without paying anything today. Your bank account
              will thank you.
            </p>
          </div>

          {/* Flexible EMIs */}
          <div className="text-center w-full sm:w-[350px] md:w-[300px] p-4 ">
            <Image
              className="mx-auto w-[60px] md:w-[70px]"
              src="/money.png"
              alt="money"
              width={70}
              height={70}
            />
            <h1 className="mt-4 text-lg md:text-xl font-bold">Flexible EMIs</h1>
            <p className="mt-2 text-base md:text-lg ">
              Choose a payment plan from 3 to 24 months that fits your budget
              perfectly.
            </p>
          </div>

          {/* Verified Agents */}
          <div className="text-center w-full sm:w-[350px] md:w-[300px] p-4">
            <Image
              className="mx-auto w-[60px] md:w-[70px]"
              src="/trust.png"
              alt="trust"
              width={70}
              height={70}
            />
            <h1 className="mt-4 text-lg md:text-xl font-bold">
              Verified Agents
            </h1>
            <p className="mt-2 text-base md:text-lg ">
              Travel with confidence. We partner only with trusted and vetted
              travel experts.
            </p>
          </div>

          {/* Instant Approval */}
          <div className="text-center w-full sm:w-[350px] md:w-[300px] p-4 ">
            <Image
              className="mx-auto w-[60px] md:w-[70px]"
              src="/approved.png"
              alt="approved"
              width={70}
              height={70}
            />
            <h1 className="mt-4 text-lg md:text-xl font-bold">
              Instant Approval
            </h1>
            <p className="mt-2 text-base md:text-lg ">
              Our quick digital KYC process gives you an approval decision in
              minutes.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-16 px-4 flex flex-col lg:flex-row items-center gap-2">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <Image
            src="/calculator.png"
            alt="emiLogo"
            width={490}
            height={450}
            className="max-w-full h-auto"
          />
        </div>

        {/* EMI Calculator Section */}
        <div className="w-full lg:w-1/2 ">
          <EMICalculator />
        </div>
      </section>

      <section className="w-full flex items-center justify-center  mt-36 mb-24  ">
        <div className="middle text-center">
          <h1 className="font-semibold text-4xl">Popular Travel Packages</h1>
          <p className="mt-3 text-lg text-blue-500 md:w-[510px]">
            Handpicked destinations to fuel your wanderlust.
          </p>
        </div>
      </section>

      <section className="px-4 py-10 w-full">
        <Carousel
          opts={{ align: "start", loop: true }}
          className="w-full px-4 relative"
        >
          <CarouselContent className="-ml-4 md:-ml-6">
            {packages.map((pkg, index) => (
              <CarouselItem
                key={index}
                className="pl-4 md:pl-6 basis-[95%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <div className="rounded-2xl overflow-hidden shadow-md bg-[#E9F1FF] flex flex-col h-full">
                  {/* Image + Title Overlay */}
                  <div className="relative">
                    <Image
                      src={pkg.image}
                      alt={pkg.title}
                      width={400}
                      height={250}
                      className="object-cover w-full h-[200px]"
                    />
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white bg-opacity-80 text-blue-800 text-center px-4 py-1 rounded-full font-semibold text-sm sm:text-base">
                      {pkg.title}
                    </div>
                  </div>

                  {/* Details Section */}
                  <div className="px-4 py-4 text-center flex flex-col gap-1">
                    <h3 className="font-semibold text-base">{pkg.subtitle}</h3>
                    <p className="text-sm text-gray-500">{pkg.duration}</p>
                    <h4 className="text-lg font-bold mt-2">{pkg.price}</h4>
                    <p className="text-sm text-gray-600">{pkg.priceLabel}</p>
                    <button className="mt-4 border border-blue-600 text-blue-600 px-4 py-2 rounded-full hover:bg-blue-600 hover:text-white transition">
                      View Details
                    </button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Buttons */}
          <CarouselPrevious className="left-2 sm:left-4" />
          <CarouselNext className="right-2 sm:right-4" />
        </Carousel>
      </section>

      <section id="faq" className="py-20 ">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {/* <!-- FAQ Item 1 --> */}
            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="font-semibold cursor-pointer flex justify-between items-center">
                What is PayLater?
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  data-lucide="chevron-down"
                  className="lucide lucide-chevron-down h-5 w-5 accordion-arrow transition-transform"
                >
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </summary>
              <p className="mt-4 text-gray-600">
                PayLater is a "Book Now, Pay Later" platform that allows you to
                book travel packages from verified agents without any upfront
                payment. You can pay for your trip after you've completed it,
                either in a lump sum or through easy monthly installments
                (EMIs).
              </p>
            </details>
            {/* <!-- FAQ Item 2 --> */}
            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="font-semibold cursor-pointer flex justify-between items-center">
                Is there any interest on the EMI?
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  data-lucide="chevron-down"
                  className="lucide lucide-chevron-down h-5 w-5 accordion-arrow transition-transform"
                >
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </summary>
              <p className="mt-4 text-gray-600">
                Yes, our EMI options come with a nominal interest rate, which is
                clearly communicated during the booking process. The EMI
                calculator provides an estimate. There are no hidden charges.
              </p>
            </details>
            {/* <!-- FAQ Item 3 --> */}
            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="font-semibold cursor-pointer flex justify-between items-center">
                How are the travel agents verified?
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  data-lucide="chevron-down"
                  className="lucide lucide-chevron-down h-5 w-5 accordion-arrow transition-transform"
                >
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </summary>
              <p className="mt-4 text-gray-600">
                We have a rigorous onboarding process for all travel agents.
                This includes verifying their business registration, GSTIN, past
                customer reviews, and operational history to ensure you travel
                with trusted and reliable professionals.
              </p>
            </details>
            {/* <!-- FAQ Item 4 --> */}
            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="font-semibold cursor-pointer flex justify-between items-center">
                What documents are required for KYC?
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  data-lucide="chevron-down"
                  className="lucide lucide-chevron-down h-5 w-5 accordion-arrow transition-transform"
                >
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </summary>
              <p className="mt-4 text-gray-600">
                Our digital KYC process is quick and simple. You will typically
                need your PAN card, Aadhaar card for address proof, and you'll
                be asked to take a live selfie for verification.
              </p>
            </details>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HeroSection;

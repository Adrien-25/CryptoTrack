"use client";

import React from "react";

export default function Header() {
  return (
    <header className="mb-4">
      <div className="flex justify-between">
        <div className="header-logo">
          <div className="relative flex items-center justify-start">
            <div className="relative w-12 h-12 flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 200 200"
                className="h-8 w-8"
              >
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="#f0f0f0"
                  stroke="#333"
                  strokeWidth="4"
                />
                <path
                  d="M100 40 L140 100 L100 160 L60 100 Z"
                  fill="#4CAF50"
                  stroke="#333"
                  strokeWidth="4"
                />
                <text
                  x="100"
                  y="185"
                  fontFamily="Arial, sans-serif"
                  fontSize="24"
                  textAnchor="middle"
                  fill="#333"
                >
                  CryptoTrack
                </text>
                <path
                  d="M85 70 L115 70 L115 130 L85 130 M85 100 L115 100"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="text-white pl-2 text-xl font-bold tracking-wide">
              CRYPTOTRACK
            </div>
          </div>
        </div>
        <div className="flex justify-start items-center gap-x-4	">
          {/* SEARCH BUTTON */}
          <div>
            <button
              type="button"
              className="h-8 w-8 leading-8 text-lg p-0 border-transparent flex items-center justify-center bg-white hover:bg-slate-400 duration-300 rounded-full"
            >
              <svg
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
              >
                <circle
                  r="6"
                  transform="matrix(-1 0 0 1 7 7)"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                ></circle>
                <path
                  d="M11.5 11.5L14 14"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                ></path>
              </svg>
            </button>
          </div>
          {/* SWITCH BUTTON */}
          <div>
            <button
              type="button"
              className="h-8 w-8 leading-8 text-lg p-0 border-transparent flex items-center justify-center bg-white hover:bg-slate-400 duration-300 rounded-full"
            >
              {/* ICON FAVORITE */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
                className="h-4 w-4 fill-black	"
                viewBox="0 0 24 24"
              >
                <path d="M20.5,4.609A5.811,5.811,0,0,0,16,2.5a5.75,5.75,0,0,0-4,1.455A5.75,5.75,0,0,0,8,2.5,5.811,5.811,0,0,0,3.5,4.609c-.953,1.156-1.95,3.249-1.289,6.66,1.055,5.447,8.966,9.917,9.3,10.1a1,1,0,0,0,.974,0c.336-.187,8.247-4.657,9.3-10.1C22.45,7.858,21.453,5.765,20.5,4.609Zm-.674,6.28C19.08,14.74,13.658,18.322,12,19.34c-2.336-1.41-7.142-4.95-7.821-8.451-.513-2.646.189-4.183.869-5.007A3.819,3.819,0,0,1,8,4.5a3.493,3.493,0,0,1,3.115,1.469,1.005,1.005,0,0,0,1.76.011A3.489,3.489,0,0,1,16,4.5a3.819,3.819,0,0,1,2.959,1.382C19.637,6.706,20.339,8.243,19.826,10.889Z" />
              </svg>
              {/* ICON LIST */}
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 fill-black"
                viewBox="0 0 24 24"
              >
                <path d="M23,4a1,1,0,0,1-1,1H10a1,1,0,0,1,0-2H22A1,1,0,0,1,23,4Zm-1,7H10a1,1,0,0,0,0,2H22a1,1,0,0,0,0-2Zm0,8H10a1,1,0,0,0,0,2H22a1,1,0,0,0,0-2ZM2,5H6A1,1,0,0,0,6,3H2A1,1,0,0,0,2,5Zm0,8H6a1,1,0,0,0,0-2H2a1,1,0,0,0,0,2Zm0,8H6a1,1,0,0,0,0-2H2a1,1,0,0,0,0,2Z" />
              </svg> */}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {

    // Generate the list of page numbers
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <div className="flex items-center justify-center py-10 lg:px-0 sm:px-6 px-4">
            <div className="lg:w-3/5 w-full  flex items-center justify-between border-t border-gray-200">
                <div 
                    className="flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer"
                    onClick={() => currentPage > 1? onPageChange(currentPage - 1):null}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
        </svg>
                    <p className="text-sm ml-3 font-medium leading-none ">Previous</p>
                </div>
                <div className="sm:flex hidden">
                    {pages.map(page => (
                        <p 
                            key={page} 
                            className={`text-sm font-medium leading-none cursor-pointer hover:underline
                            ${page === currentPage ? 'text-indigo-700 border-t border-indigo-400' : 'text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400'} pt-3 mr-4 px-2`}
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </p>
                    ))}
                </div>
                <div 
                    className="flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer"
                    onClick={() => currentPage < totalPages? onPageChange(currentPage + 1):null}
                >
                    <p className="text-sm font-medium leading-none mr-3">Next</p>
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
                </div>
            </div>
        </div>
    );
};

export default Pagination;

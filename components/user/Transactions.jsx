'use client'

import { getTransactions } from "@/services/userData";
import { useQuery } from "@tanstack/react-query";

function Transactions() {
    const { data: transactions, isLoading } = useQuery({
        queryKey: ["transactions"],
        queryFn: getTransactions,
    });
    if (isLoading)
        return <div className="text-center p-10">Loading transactions...</div>;

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm overflow-x-auto">
            <table className="w-full text-sm text-right">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th className="px-6 py-3">شماره سفارش</th>
                        <th className="px-6 py-3">نوع تراکنش</th>
                        <th className="px-6 py-3">مبلغ (تومان)</th>
                        <th className="px-6 py-3">تاریخ و ساعت</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions?.map((tx) => (
                        <tr key={tx.id} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-4 font-mono">{tx.orderNumber}</td>
                            <td className="px-6 py-4">{tx.type}</td>
                            <td className="px-6 py-4 font-mono">{tx.amount}</td>
                            <td className="px-6 py-4 font-mono">{tx.dateTime}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {!transactions ||
                (transactions.length === 0 && (
                    <p className="text-center text-gray-500 py-10">
                        تراکنشی برای نمایش وجود ندارد.
                    </p>
                ))}
        </div>
    );
}

export default Transactions
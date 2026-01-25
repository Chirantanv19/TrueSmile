'use client';

export function AppointmentsHeader() {
    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <div className="flex items-center justify-between">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Appointments</h2>
                <p className="text-slate-500">
                    Manage and schedule patient requests.
                </p>
            </div>
            <div className="flex items-center space-x-2">
                <button
                    onClick={handleRefresh}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-slate-900 text-white shadow hover:bg-slate-900/90 h-9 px-4 py-2"
                >
                    Refresh
                </button>
            </div>
        </div>
    );
}

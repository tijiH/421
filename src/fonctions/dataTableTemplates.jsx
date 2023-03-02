import { Tag } from 'primereact/tag';

export const streakCustomHeader = () => {
    return (
        <Image priority src="/streak.png" alt='logo' width={25} height={25}/>
    )
}

export const streakBodyTemplate = (rowData) => {
    let severity = "info";
    if (rowData.streak >= 12) severity = "danger";
    else if (rowData.streak >= 7) severity = "warning";
    else if (rowData.streak >= 3) severity = "success";

    return (
        <div className='flex align-items-center justify-content-between gap-2'>
            <Tag severity={severity} className='cursor-pointer text-sm'>
                {rowData.streak >= 3 ? rowData.streak - 2 : 0}
            </Tag>
        </div>
    )
}

export const peutFumerBodyTemplate = (rowData, setPlayerCannotSmoke) => {
    return (
        <div className='ml-1 flex align-items-center'>
            <Tag severity={rowData.peutFumer ? "success" : "danger"} onClick={() => setPlayerCannotSmoke(rowData.value)}>
                {rowData.peutFumer ?
                    <i className='pi pi-times cursor-pointer' />
                    :
                    <i className='pi pi-check cursor-pointer' />
                }
            </Tag>;
        </div>
    )
}

import { useState, useEffect } from "react"
import { Staff, staffService } from "./staffService"

export default function StaffTable() {
    const [staff, setStaff] = useState<Staff[]>([]);

    useEffect(() => {
        staffService.getStaff()
            .then(res => setStaff(res))
    }, [])

    return (
        staff.map(s => (<p>{s.name}</p>))
    )
}
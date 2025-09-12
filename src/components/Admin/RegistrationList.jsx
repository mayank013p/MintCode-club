import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import './style.css';

const RegistrationList = ({ eventId }) => {
  const [registrations, setRegistrations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  
  useEffect(() => {
    if (!eventId) {
      setLoading(false);
      return;
    }

    const fetchRegistrations = async () => {
      const adminToken = localStorage.getItem('adminToken');
      if (!adminToken) {
        setError('Unauthorized. Please log in as an admin.');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${apiUrl}/api/admin/registrations/${eventId}`, {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        });
        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            throw new Error('Unauthorized. Your session may have expired.');
          }
          throw new Error('Failed to fetch registrations');
        }
        const data = await response.json();
        // The API might return an object with a 'registrations' property, or just the array.
        // This ensures we always have an array to prevent the .map() function from crashing.
        const registrationsList = Array.isArray(data) ? data : data?.registrations;
        setRegistrations(Array.isArray(registrationsList) ? registrationsList : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, [eventId]);

  if (loading) return <p>Loading registrations...</p>;
  if (error) return <p>Error: {error}</p>;
  if (registrations.length === 0) return <p>No registrations found for this event.</p>;

  const filteredRegistrations = registrations.filter(
    (reg) =>
      (reg.fullname &&
        reg.fullname.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (reg.email && reg.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (reg.rollnumber &&
        reg.rollnumber.toString().toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const exportToExcel = () => {
    const worksheetData = filteredRegistrations.map((reg, index) => ({
      'S.No.': index + 1,
      'Full Name': reg.fullname,
      Email: reg.email,
      Phone: reg.phone,
      'GitHub Student': reg.gitstudent ? 'Yes' : 'No',
      'Roll Number': reg.rollnumber,
      'College Name': reg.collegename,
      Year: reg.year,
      'MintCode Member': reg.mintcodemember ? 'Yes' : 'No',
      Gender: reg.gender,
      Occupation: reg.occupation,
      Stream: reg.stream,
      Remarks: reg.remarks,
      'Registered At': new Date(reg.registeredat).toLocaleString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Registrations');
    XLSX.writeFile(workbook, `Event_${eventId}_Registrations.xlsx`);
  };

  return (
    <div>
      <h3>Registrations for Event ID: {eventId}</h3>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <input
          type="text"
          className="admin-search-input"
          placeholder="Search by name, email, or roll number..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ margin: 0, flexGrow: 1, marginRight: '1rem' }}
        />
        <button onClick={exportToExcel} className="create-event-btn">
          Export to Excel
        </button>
      </div>
      {filteredRegistrations.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>GitHub Student</th>
              <th>Roll Number</th>
              <th>College Name</th>
              <th>Year</th>
              <th>MintCode Member</th>
              <th>Gender</th>
              <th>Occupation</th>
              <th>Stream</th>
              <th>Remarks</th>
              <th>Registered At</th>
            </tr>
          </thead>
          <tbody>
            {filteredRegistrations.map((reg, index) => (
              <tr key={reg.id}>
                <td>{index + 1}</td>
                <td>{reg.fullname}</td>
                <td>{reg.email}</td>
                <td>{reg.phone}</td>
                <td>{reg.gitstudent ? 'Yes' : 'No'}</td>
                <td>{reg.rollnumber}</td>
                <td>{reg.collegename}</td>
                <td>{reg.year}</td>
                <td>{reg.mintcodemember ? 'Yes' : 'No'}</td>
                <td>{reg.gender}</td>
                <td>{reg.occupation}</td>
                <td>{reg.stream}</td>
                <td>{reg.remarks}</td>
                <td>{new Date(reg.registeredat).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No registrations match your search.</p>
      )}
    </div>
  );
};

export default RegistrationList;

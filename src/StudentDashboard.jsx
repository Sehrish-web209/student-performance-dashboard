import { useState } from 'react';

export default function StudentDashboard({students: studentList}) {
  // Main State
  const [students, setStudents] = useState(studentList);

  // UI Control States
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [searchRollNo, setSearchRollNo] = useState('');
  const [foundStudent, setFoundStudent] = useState(null);
  const [highlightedStudent, setHighlightedStudent] = useState(null);
  const [deleteRollNo, setDeleteRollNo] = useState('');

  // Form State for Adding New Student
  const [newStudent, setNewStudent] = useState({
    "Student_Names": '',
    "Phone_No.": '',
    "Math": 0,
    "Physics": 0,
    "Chemistry": 0,
    "Grade": 'A',
    "Comment": 'Newly Enrolled',
    "Roll No.": '',
    "School Name": 'Martin Luther School',
    "Student Address": ''
  });
  const [isPriority, setIsPriority] = useState(false);

  // =========================================================================
  // TASK HANDLERS (complete the code inside these functions)
  // =========================================================================

  // Task 1: Log Student Directory (forEach)
  const handleLogDirectory = () => {
    console.clear();
    console.log("=== STUDENT DIRECTORY ===");
    // TODO: Use students.forEach() to log each student's name and roll number 
    
    students.forEach((student) => {
      console.log(
        `${student["Student_Names"]} - Roll No: ${student["Roll No."]}`
      );
    });
    
    // Format: "<Student_Names> - Roll No: <Roll No.>"
    // Example: Donald Contreras - Roll No: 524613
  };

  // Task 2: Filter by Grade (filter)
  const getFilteredStudents = () => {
    if (selectedGrade === 'All') return students;
    // TODO: Use students.filter() to return students matching selectedGrade
    return students; // Replace this line
  };

  // Task 3a: Search Student by Roll No (find)
  const handleSearchByRollNo = (e) => {
    e.preventDefault();
    const targetRoll = parseInt(searchRollNo, 10);
    
    // TODO: Use students.find() to get the student object matching targetRoll
    const result = null; // Replace this line
    if(!result){
      alert("Student not found!");
    }
    setFoundStudent(result);
  };

  // Task 3b: Find Last 'A' Student (findLast)
  const handleFindLastAStudent = () => {
    // TODO: Use students.findLast() to find the last student with Grade === "A"
    const lastA = null; // Replace this line 
    if(!lastA){
        alert("Student not found!");
    }
    setHighlightedStudent(lastA);
  };

  // Task 4: Delete by Roll No (findIndex + splice)
  const handleDeleteByRollNo = (e) => {
    e.preventDefault();
    const targetRoll = parseInt(deleteRollNo, 10);

    // TODO 1: Use students.findIndex() to find the index of the student with targetRoll
    const targetIndex = -1; // Replace this line
    if (targetIndex !== -1) {
      // TODO 2: Create a shallow copy of students state array
      // TODO 3: Use .splice() on the copied array to remove 1 student at targetIndex
      // TODO 4: Update state with setStudents()
      setDeleteRollNo('');
    } else {
      alert("Student not found!");
    }
  };

  // Task 5: Find Last At-Risk Student Index (findLastIndex)
  const handleFindLastAtRiskIndex = () => {
    // TODO: Use students.findLastIndex() to find index of the last student with Chemistry < 40
    const index = -1; // Replace this line
    if (index !== -1) {
      alert(`Last at-risk student (Chemistry < 40) is at array index: ${index}`);
    } else {
      alert("No at-risk students found in Chemistry.");
    }
  };

  // Task 6a: Class Warning Badge (some)
  const checkHasFailingScores = () => {
    // TODO: Use students.some() to return true if ANY student has Math, Physics, or Chemistry < 30
    return false; // Replace this line
  };

  // Task 6b: High Performing Banner (every)
  const checkIsHighPerformingClass = () => {
    // TODO: Use students.every() to return true if EVERY student has Grade "A" or "B+"
    return false; // Replace this line
  };

  // Task 7a: Class Analytics (reduce)
  const getAverageMathScore = () => {
    if (students.length === 0) return 0;
    // TODO: Use students.reduce() to sum Math scores and calculate average
    const totalMath = 0; // Replace this line
    return (totalMath / students.length).toFixed(1);
  };
  
  // Task 7b: Class Analytics (reduce)
  const getAveragePhysicsScore = () => {
    if (students.length === 0) return 0;
    // TODO: Use students.reduce() to sum Physics scores and calculate average
    const totalPhysics = 0; // Replace this line
    return (totalPhysics / students.length).toFixed(1);
  };
  
  // Task 7c: Class Analytics (reduce)
  const getTotalAGrades = () => {
    // TODO: Use students.reduce() to count total number of students with Grade === "A"
    return 0; // Replace this line
  };

  // Task 8: Honor Roll Top 3 Preview (slice)
  const getTopThreeStudents = () => {
    // TODO: Use students.slice() to return a copy of the first 3 students
    return []; // Replace this line
  };

  // Task 9a & 9c: Add New Student (push / unshift)
  const handleAddStudent = (e) => {
    e.preventDefault();
    // Create a new student array copy
    const updatedList = [...students];

    if (isPriority) {
      // TODO: Use .unshift() to add newStudent to the START of updatedList
    } else {
      // TODO: Use .push() to add newStudent to the END of updatedList
    }

    setStudents(updatedList);
    // Reset form
    setNewStudent({
      "Student_Names": '',
      "Phone_No.": '',
      "Math": 0,
      "Physics": 0,
      "Chemistry": 0,
      "Grade": 'A',
      "Comment": 'Newly Enrolled',
      "Roll No.": '',
      "School Name": 'Martin Luther School',
      "Student Address": ''
    });
    setIsPriority(false);
  };

  // Task 9b: Remove Last Entry (pop)
  const handleRemoveLastStudent = () => {
    if (students.length === 0) return;
    const updatedList = [...students];
    // TODO: Use updatedList.pop() to remove the last student
    setStudents(updatedList);
  };

  // Task 9d: Process First Application (shift)
  const handleRemoveFirstStudent = () => {
    if (students.length === 0) return;
    const updatedList = [...students];
    // TODO: Use updatedList.shift() to remove the first student
    setStudents(updatedList);
  };

  // Task 10: Card Remove Action (splice)
  const handleRemoveCardByIndex = (index) => {
    const updatedList = [...students];
    // TODO: Use updatedList.splice() to remove the student at the given index
    setStudents(updatedList);
  };

  // UI Components Render
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>🎓 Student Performance Dashboard</h1>
        <button style={styles.secondaryBtn} onClick={handleLogDirectory}>
          📋 Log Directory (Console)
        </button>
      </header>

      {/* STATUS BANNERS (some & every) */}
      <section style={styles.bannerSection}>
        {checkHasFailingScores() && (
          <div style={{ ...styles.alertBanner, backgroundColor: '#fee2e2', color: '#991b1b' }}>
            ⚠️ <strong>Attention Needed:</strong> One or more students scored below 30 in a subject!
          </div>
        )}
        {checkIsHighPerformingClass() && (
          <div style={{ ...styles.alertBanner, backgroundColor: '#d1fae5', color: '#065f46' }}>
            🌟 <strong>High Performing Class:</strong> Every student currently holds an "A" or "B+" grade!
          </div>
        )}
      </section>

      {/* CLASS STATS (reduce) */}
      <section style={styles.card}>
        <h2>📊 Class Analytics</h2>
        <div style={styles.statsGrid}>
          <div style={styles.statBox}>
            <small>Avg Math Score</small>
            <h3>{getAverageMathScore()}</h3>
          </div>
          <div style={styles.statBox}>
            <small>Avg Physics Score</small>
            <h3>{getAveragePhysicsScore()}</h3>
          </div>
          <div style={styles.statBox}>
            <small>Total 'A' Grade Students</small>
            <h3>{getTotalAGrades()}</h3>
          </div>
        </div>
      </section>

      {/* TOP 3 PREVIEW PANEL (slice) */}
      <section style={styles.card}>
        <h2>⭐ Honor Roll Preview (Top 3)</h2>
        <div style={styles.miniList}>
          {getTopThreeStudents().map((s, idx) => (
            <div key={s["Roll No."] || idx} style={styles.miniCard}>
              <strong>#{idx + 1} {s.Student_Names}</strong> (Roll: {s["Roll No."]}) - Grade: {s.Grade}
            </div>
          ))}
        </div>
      </section>

      {/* CONTROLS: SEARCH & ACTIONS */}
      <div style={styles.twoColumnGrid}>
        {/* Search & Index Tools */}
        <section style={styles.card}>
          <h2>🔍 Search & Target Methods</h2>
          
          {/* find */}
          <form onSubmit={handleSearchByRollNo} style={styles.inlineForm}>
            <input
              type="number"
              placeholder="Search Roll No."
              value={searchRollNo}
              onChange={(e) => setSearchRollNo(e.target.value)}
              required
            />
            <button type="submit">Find Student</button>
          </form>

          {foundStudent && (
            <div style={styles.highlightBox}>
              <strong>Found:</strong> {foundStudent.Student_Names} | Grade: {foundStudent.Grade} | Phone: {foundStudent["Phone_No."]}
            </div>
          )}

          <hr style={{ margin: '15px 0' }} />

          {/* findIndex + splice */}
          <form onSubmit={handleDeleteByRollNo} style={styles.inlineForm}>
            <input
              type="number"
              placeholder="Roll No. to Delete"
              value={deleteRollNo}
              onChange={(e) => setDeleteRollNo(e.target.value)}
              required
            />
            <button type="submit" style={{ backgroundColor: '#dc2626', color: '#fff' }}>
              Find & Delete
            </button>
          </form>

          <hr style={{ margin: '15px 0' }} />

          {/* findLast & findLastIndex */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button onClick={handleFindLastAStudent}>Get Last 'A' Student</button>
            <button onClick={handleFindLastAtRiskIndex}>Index of Last At-Risk (Chem &lt; 40)</button>
          </div>

          {highlightedStudent && (
            <div style={styles.highlightBox}>
              <strong>Last 'A' Student:</strong> {highlightedStudent.Student_Names} (Roll No: {highlightedStudent["Roll No."]})
            </div>
          )}
        </section>

        {/* Stack & Queue Controls */}
        <section style={styles.card}>
          <h2>⚡ Stack & Queue Operations</h2>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <button onClick={handleRemoveFirstStudent} style={styles.warnBtn}>
              shift() Process First
            </button>
            <button onClick={handleRemoveLastStudent} style={styles.warnBtn}>
              pop() Remove Last
            </button>
          </div>

          <h3>Add New Student (push / unshift)</h3>
          <form onSubmit={handleAddStudent} style={styles.formGrid}>
            <input
              type="text"
              placeholder="Student Name"
              value={newStudent.Student_Names}
              onChange={(e) => setNewStudent({ ...newStudent, Student_Names: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Roll No"
              value={newStudent["Roll No."] || ''}
              onChange={(e) => setNewStudent({ ...newStudent, "Roll No.": parseInt(e.target.value, 10) })}
              required
            />
            <input
              type="number"
              placeholder="Math"
              value={newStudent.Math || ''}
              onChange={(e) => setNewStudent({ ...newStudent, Math: parseInt(e.target.value, 10) })}
            />
            <input
              type="number"
              placeholder="Physics"
              value={newStudent.Physics || ''}
              onChange={(e) => setNewStudent({ ...newStudent, Physics: parseInt(e.target.value, 10) })}
            />
            <input
              type="number"
              placeholder="Chemistry"
              value={newStudent.Chemistry || ''}
              onChange={(e) => setNewStudent({ ...newStudent, Chemistry: parseInt(e.target.value, 10) })}
            />
            <select
              value={newStudent.Grade}
              onChange={(e) => setNewStudent({ ...newStudent, Grade: e.target.value })}
            >
              <option value="A">Grade A</option>
              <option value="B+">Grade B+</option>
              <option value="C">Grade C</option>
              <option value="F">Grade F</option>
            </select>

            <label style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                checked={isPriority}
                onChange={(e) => setIsPriority(e.target.checked)}
              />
              Mark as Priority (unshift to top of array)
            </label>

            <button type="submit" style={{ gridColumn: 'span 2', backgroundColor: '#2563eb', color: '#fff' }}>
              {isPriority ? 'unshift() Priority Student' : 'push() New Student'}
            </button>
          </form>
        </section>
      </div>

      {/* STUDENT DIRECTORY LIST (filter, map, splice) */}
      <section style={styles.card}>
        <div style={styles.listHeader}>
          <h2>🎓 Student Directory ({getFilteredStudents().length})</h2>
          
          {/* filter dropdown */}
          <div>
            <label>Filter by Grade: </label>
            <select value={selectedGrade} onChange={(e) => setSelectedGrade(e.target.value)}>
              <option value="All">All Grades</option>
              <option value="A">Grade A</option>
              <option value="B+">Grade B+</option>
              <option value="C">Grade C</option>
            </select>
          </div>
        </div>

        {/* map */}
        <div style={styles.grid}>
          {getFilteredStudents().map((student, index) => (
            <div key={student["Roll No."] || index} style={styles.studentCard}>
              <button 
                onClick={() => handleRemoveCardByIndex(index)} 
                style={styles.deleteCardBtn}
                title="Remove with splice()"
              >
                ✕
              </button>
              <h3>{student.Student_Names}</h3>
              <p><strong>Roll No:</strong> {student["Roll No."]}</p>
              <p><strong>Grade:</strong> <span style={styles.badge}>{student.Grade}</span></p>
              <p><strong>Phone:</strong> {student["Phone_No."]}</p>
              <div style={styles.scoreRow}>
                <span>Math: {student.Math}</span>
                <span>Phys: {student.Physics}</span>
                <span>Chem: {student.Chemistry}</span>
              </div>
              <small style={{ color: '#666', marginTop: '8px', display: 'block' }}>
                {student.Comment}
              </small>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// Basic inline styling object to keep the starter self-contained
const styles = {
  container: { padding: '20px', fontFamily: 'system-ui, sans-serif', maxWidth: '1200px', margin: '0 auto', backgroundColor: '#f8fafc' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  bannerSection: { marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' },
  alertBanner: { padding: '12px 16px', borderRadius: '8px', fontSize: '14px' },
  card: { backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', marginBottom: '20px' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginTop: '10px' },
  statBox: { backgroundColor: '#f1f5f9', padding: '15px', borderRadius: '8px', textAlign: 'center' },
  miniList: { display: 'flex', gap: '10px', flexWrap: 'wrap' },
  miniCard: { backgroundColor: '#e2e8f0', padding: '10px 14px', borderRadius: '6px', fontSize: '14px' },
  twoColumnGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' },
  inlineForm: { display: 'flex', gap: '10px', marginTop: '10px' },
  formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' },
  highlightBox: { marginTop: '10px', padding: '10px', backgroundColor: '#fef3c7', borderRadius: '6px', fontSize: '14px' },
  listHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '15px' },
  studentCard: { position: 'relative', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff' },
  deleteCardBtn: { position: 'absolute', top: '10px', right: '10px', border: 'none', background: '#fee2e2', color: '#dc2626', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer' },
  badge: { backgroundColor: '#dbeafe', color: '#1e40af', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' },
  scoreRow: { display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginTop: '10px', background: '#f8fafc', padding: '6px', borderRadius: '4px' },
  secondaryBtn: { padding: '8px 16px', cursor: 'pointer', backgroundColor: '#e2e8f0', border: 'none', borderRadius: '6px' },
  warnBtn: { backgroundColor: '#f97316', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer' }
};

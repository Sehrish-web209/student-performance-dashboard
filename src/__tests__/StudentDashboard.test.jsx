import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import StudentDashboard from '../StudentDashboard';

// Centralized mock dataset (6 representative students)
const MOCK_STUDENTS = [
  {
    Student_Names: "Donald Contreras",
    "Phone_No.": 9208625450,
    Math: 76,
    Physics: 84,
    Chemistry: 54,
    Grade: "B+",
    Comment: "Good Pursuance",
    "Roll No.": 524613,
    "School Name": "Martin Luther School",
    "Student Address": "478 Mooney Park, New Valerie, VI 28836"
  },
  {
    Student_Names: "Joseph Horton",
    "Phone_No.": 9886408555,
    Math: 91,
    Physics: 75,
    Chemistry: 78,
    Grade: "A",
    Comment: "Very Good Achivement",
    "Roll No.": 561635,
    "School Name": "Martin Luther School",
    "Student Address": "037 Matthew Shores, Greeneton, CA 98399"
  },
  {
    Student_Names: "Savannah Burns MD",
    "Phone_No.": 9047592659,
    Math: 64,
    Physics: 98,
    Chemistry: 20, // < 30 score triggers warning banner
    Grade: "C",
    Comment: "Below Average Achivement",
    "Roll No.": 560985,
    "School Name": "Martin Luther School",
    "Student Address": "96124 Lloyd Streets, Edwardmouth, DC 61677"
  },
  {
    Student_Names: "William Carter",
    "Phone_No.": 9048473864,
    Math: 15, // < 30 score triggers warning banner
    Physics: 95,
    Chemistry: 32,
    Grade: "A",
    Comment: "Poor Pursuance",
    "Roll No.": 535126,
    "School Name": "Martin Luther School",
    "Student Address": "11959 Clark Village, Ivanview, NH 43940"
  },
  {
    Student_Names: "John Rodriguez",
    "Phone_No.": 9685225730,
    Math: 86,
    Physics: 86,
    Chemistry: 66,
    Grade: "B+",
    Comment: "Good Pursuance",
    "Roll No.": 559410,
    "School Name": "Martin Luther School",
    "Student Address": "051 Weaver Glen Apt. 724, West Davidborough, MT 06034"
  },
  {
    Student_Names: "Natalie Nash",
    "Phone_No.": 9966112184,
    Math: 18, // < 30 score
    Physics: 41,
    Chemistry: 11, // < 30 score
    Grade: "A",
    Comment: "Failed",
    "Roll No.": 564296,
    "School Name": "Martin Luther School",
    "Student Address": "1269 Joel Village, New Josephshire, WA 54166"
  }
];

describe('StudentDashboard Component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  // =========================================================================
  // handleLogDirectory (forEach)
  // =========================================================================
  describe('Student directory logging (handleLogDirectory - forEach)', () => {
    it('should log each student name and roll number in the correct format', () => {
      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      render(<StudentDashboard students={MOCK_STUDENTS} />);

      const logBtn = screen.getByRole('button', { name: /Log Directory/i });
      fireEvent.click(logBtn);

      expect(consoleLogSpy).toHaveBeenCalledWith('=== STUDENT DIRECTORY ===');
      expect(consoleLogSpy).toHaveBeenCalledWith(`${MOCK_STUDENTS[0].Student_Names} - Roll No: ${MOCK_STUDENTS[0]['Roll No.']}`);
      expect(consoleLogSpy).toHaveBeenCalledWith(`${MOCK_STUDENTS[1].Student_Names} - Roll No: ${MOCK_STUDENTS[1]['Roll No.']}`);
    });
  });

  // =========================================================================
  // getFilteredStudents (filter)
  // =========================================================================
  describe('Grade filtering (getFilteredStudents - filter)', () => {
    it('should filter students by the selected grade', () => {
      render(<StudentDashboard students={MOCK_STUDENTS} />);

      const directorySection = screen.getByText(/Filter by Grade:/i).closest('section');
      const selectGrade = within(directorySection).getByRole('combobox');

      let studentsByGrade = Object.groupBy(MOCK_STUDENTS, (student) => student.Grade);
      let studentsWithGradeA = studentsByGrade["A"];
      let studentsWithGradeB = studentsByGrade["B+"];
      let studentsWithGradeC = studentsByGrade["C"];

      // --- Default "All" grades ---
      expect(within(directorySection).getByText(`${MOCK_STUDENTS[0].Student_Names}`)).toBeTruthy();
      expect(within(directorySection).getByText(`${MOCK_STUDENTS[1].Student_Names}`)).toBeTruthy();
      expect(within(directorySection).getByText(`${MOCK_STUDENTS[2].Student_Names}`)).toBeTruthy();

      // --- Filter by Grade "A" ---
      fireEvent.change(selectGrade, { target: { value: 'A' } });

      expect(within(directorySection).getByText(studentsWithGradeA[0].Student_Names)).toBeTruthy();
      expect(within(directorySection).queryByText(studentsWithGradeB[0]?.Student_Names)).toBeNull();
      expect(within(directorySection).queryByText(studentsWithGradeC[0]?.Student_Names)).toBeNull();

      // --- Filter by Grade "B+" ---
      fireEvent.change(selectGrade, { target: { value: 'B+' } });

      expect(within(directorySection).getByText(`${studentsWithGradeB[0].Student_Names}`)).toBeTruthy();
      expect(within(directorySection).getByText(`${studentsWithGradeB[1].Student_Names}`)).toBeTruthy();
      expect(within(directorySection).queryByText(studentsWithGradeA[0].Student_Names)).toBeNull();

      // --- Filter by Grade "C" ---
      fireEvent.change(selectGrade, { target: { value: 'C' } });

      expect(within(directorySection).getByText(studentsWithGradeC[0].Student_Names)).toBeTruthy();
      expect(within(directorySection).queryByText(studentsWithGradeA[0].Student_Names)).toBeNull();
      expect(within(directorySection).queryByText(studentsWithGradeB[0].Student_Names)).toBeNull();
    });
  });

  // =========================================================================
  // Search by Roll No (find) & Last "A" Student (findLast)
  // =========================================================================
  describe('Student search (find / findLast)', () => {
    it('should find a student by roll number', () => {
      render(<StudentDashboard students={MOCK_STUDENTS} />);

      const searchInput = screen.getByPlaceholderText(/Search Roll No./i);
      const searchBtn = screen.getByRole('button', { name: /^Find Student$/i });

      fireEvent.change(searchInput, { target: { value: MOCK_STUDENTS[1]['Roll No.'] } });
      fireEvent.click(searchBtn);

      const foundLabel = screen.getByText(/Found:/i);
      const highlightBox = foundLabel.parentElement;

      expect(
        within(highlightBox).getByText(new RegExp(MOCK_STUDENTS[1].Student_Names, 'i'))
      ).toBeTruthy();
    });

    it('should alert "Student not found!" when the searched roll number does not match', () => {
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

      render(<StudentDashboard students={MOCK_STUDENTS} />);

      const searchInput = screen.getByPlaceholderText(/Search Roll No./i);
      const searchBtn = screen.getByRole('button', { name: /^Find Student$/i });

      fireEvent.change(searchInput, { target: { value: '999999999' } });
      fireEvent.click(searchBtn);

      expect(alertSpy).toHaveBeenCalledWith('Student not found!');

      alertSpy.mockRestore();
    });

    describe('Last grade "A" student lookup (findLast)', () => {
      it('should find the last student with grade "A"', () => {
        render(<StudentDashboard students={MOCK_STUDENTS} />);

        const lastABtn = screen.getByRole('button', { name: /Get Last 'A' Student/i });
        fireEvent.click(lastABtn);

        const label = screen.getByText(/Last 'A' Student:/i);
        const highlightBox = label.parentElement;
        const expectedStudent = MOCK_STUDENTS.findLast(s => s.Grade === 'A');

        expect(
          within(highlightBox).getByText(new RegExp(expectedStudent.Student_Names, 'i'))
        ).toBeTruthy();
      });

      it('should alert "Student not found!" when no student has grade "A"', () => {
        const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

        const noAStudents = MOCK_STUDENTS.map(s => ({ ...s, Grade: 'B' }));
        render(<StudentDashboard students={noAStudents} />);

        const lastABtn = screen.getByRole('button', { name: /Get Last 'A' Student/i });
        fireEvent.click(lastABtn);

        expect(alertSpy).toHaveBeenCalledWith('Student not found!');

        alertSpy.mockRestore();
      });
    });
  });

  // =========================================================================
  // Delete by Roll No (findIndex + splice) & Last At-Risk Index (findLastIndex)
  // =========================================================================
  describe('Student deletion by roll number (findIndex + findLastIndex + splice)', () => {
    it('should delete a student by roll number', () => {
      render(<StudentDashboard students={MOCK_STUDENTS} />);

      const deleteInput = screen.getByPlaceholderText(/Roll No. to Delete/i);
      const deleteBtn = screen.getByRole('button', { name: /Find & Delete/i });

      expect(screen.getByText(MOCK_STUDENTS[3].Student_Names)).toBeTruthy();

      fireEvent.change(deleteInput, { target: { value: MOCK_STUDENTS[3]['Roll No.'] } });
      fireEvent.click(deleteBtn);

      expect(screen.queryByText(MOCK_STUDENTS[3].Student_Names)).toBeNull();
    });

    it('should alert "Student not found!" when the roll number to delete does not exist', () => {
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
      render(<StudentDashboard students={MOCK_STUDENTS} />);

      const deleteInput = screen.getByPlaceholderText(/Roll No. to Delete/i);
      const deleteBtn = screen.getByRole('button', { name: /Find & Delete/i });

      fireEvent.change(deleteInput, { target: { value: '99999999' } });
      fireEvent.click(deleteBtn);

      expect(alertSpy).toHaveBeenCalledWith("Student not found!");

      alertSpy.mockRestore();
    });

    describe('Last at-risk student index lookup (findLastIndex)', () => {
      it('should alert the array index of the last at-risk student (Chemistry < 40)', () => {
        const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
        render(<StudentDashboard students={MOCK_STUDENTS} />);

        const atRiskBtn = screen.getByRole('button', { name: /Index of Last At-Risk/i });
        fireEvent.click(atRiskBtn);

        expect(alertSpy).toHaveBeenCalledWith(
          `Last at-risk student (Chemistry < 40) is at array index: ${5}` // Natalie Nash
        );

        alertSpy.mockRestore();
      });

      it('should alert "No at-risk students found in Chemistry." when none exist', () => {
        const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

        const safeStudents = MOCK_STUDENTS.map(s => ({ ...s, Chemistry: 80 }));
        render(<StudentDashboard students={safeStudents} />);

        const atRiskBtn = screen.getByRole('button', { name: /Index of Last At-Risk/i });
        fireEvent.click(atRiskBtn);

        expect(alertSpy).toHaveBeenCalledWith("No at-risk students found in Chemistry.");

        alertSpy.mockRestore();
      });
    });
  });

  // =========================================================================
  // Status Banners (some / every)
  // =========================================================================
  describe('Status banners (some + every)', () => {
    describe('Low score warning banner (some)', () => {
      it('should display the warning banner when any student scores below 30 in a subject', () => {
        const mockStudents = [
          { id: 1, Math: 80, Physics: 90, Chemistry: 85 },
          { id: 2, Math: 25, Physics: 70, Chemistry: 80 } // < 30 in Math
        ];

        render(<StudentDashboard students={mockStudents} />);

        expect(
          screen.getByText(/One or more students scored below 30 in a subject!/i)
        ).toBeTruthy();
      });

      it('should not display the warning banner when all students score 30 or above', () => {
        const mockStudents = [
          { id: 1, Math: 80, Physics: 90, Chemistry: 85 },
          { id: 2, Math: 30, Physics: 70, Chemistry: 80 }
        ];

        render(<StudentDashboard students={mockStudents} />);

        expect(
          screen.queryByText(/One or more students scored below 30 in a subject!/i)
        ).toBeNull();
      });
    });

    describe('High performing banner (every)', () => {
      it('should display the high performing banner when all students hold grade "A" or "B+"', () => {
        const mockStudents = [
          { id: 1, Grade: 'A' },
          { id: 2, Grade: 'B+' }
        ];

        render(<StudentDashboard students={mockStudents} />);

        expect(
          screen.getByText(/Every student currently holds an "A" or "B\+" grade!/i)
        ).toBeTruthy();
      });

      it('should not display the high performing banner when a non-"A"/"B+" grade exists', () => {
        const mockStudents = [
          { id: 1, Grade: 'A' },
          { id: 2, Grade: 'C' } // Non A/B+ grade present
        ];

        render(<StudentDashboard students={mockStudents} />);

        expect(
          screen.queryByText(/Every student currently holds an "A" or "B\+" grade!/i)
        ).toBeNull();
      });
    });
  });

  // =========================================================================
  // Class Analytics (reduce)
  // =========================================================================
  describe('Class analytics (reduce)', () => {
    it('should calculate average math score, average physics score, and count of "A" grades', () => {
      render(<StudentDashboard students={MOCK_STUDENTS} />);

      const mathLabel = screen.getByText(/Avg Math Score/i);
      const mathBox = mathLabel.parentElement;
      expect(within(mathBox).getByText(/58\.3/i)).toBeTruthy();

      const physicsLabel = screen.getByText(/Avg Physics Score/i);
      const physicsBox = physicsLabel.parentElement;
      expect(within(physicsBox).getByText(/79\.8/i)).toBeTruthy();

      const gradeALabel = screen.getByText(/Total 'A' Grade Students/i);
      const gradeABox = gradeALabel.parentElement;
      expect(within(gradeABox).getByText('3')).toBeTruthy();
    });

    it('should handle an empty student array gracefully', () => {
      render(<StudentDashboard students={[]} />);

      const mathLabel = screen.getByText(/Avg Math Score/i);
      const mathBox = mathLabel.parentElement;
      expect(within(mathBox).getByText('0')).toBeTruthy();

      const physicsLabel = screen.getByText(/Avg Physics Score/i);
      const physicsBox = physicsLabel.parentElement;
      expect(within(physicsBox).getByText('0')).toBeTruthy();
    });
  });

  // =========================================================================
  // Honor Roll Top 3 Preview (slice)
  // =========================================================================
  describe('Honor roll top 3 preview (getTopThreeStudents - slice)', () => {
    it('should preview the top 3 students without modifying state', () => {
      render(<StudentDashboard students={MOCK_STUDENTS} />);

      const honorRollHeading = screen.getByRole('heading', { name: /Honor Roll Preview/i });
      const honorRollCard = honorRollHeading.parentElement;

      expect(within(honorRollCard).getByText(/Donald Contreras/i)).toBeTruthy();
      expect(within(honorRollCard).getByText(/Joseph Horton/i)).toBeTruthy();
      expect(within(honorRollCard).getByText(/Savannah Burns MD/i)).toBeTruthy();
      expect(within(honorRollCard).queryByText(/William Carter/i)).toBeNull();
    });
  });

  // =========================================================================
  // Stack & Queue Operations (push, unshift, pop, shift)
  // =========================================================================
  describe('Stack and queue operations (push + pop + unshift + shift)', () => {
    it('should add a student to the end of the list using push', () => {
      render(<StudentDashboard students={MOCK_STUDENTS} />);

      fireEvent.change(screen.getByPlaceholderText('Student Name'), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByPlaceholderText('Roll No'), { target: { value: '999999' } });
      fireEvent.change(screen.getByPlaceholderText('Math'), { target: { value: '85' } });
      fireEvent.change(screen.getByPlaceholderText('Physics'), { target: { value: '90' } });
      fireEvent.change(screen.getByPlaceholderText('Chemistry'), { target: { value: '78' } });

      const formGradeSelect = screen.getAllByRole('combobox')[0];
      fireEvent.change(formGradeSelect, { target: { value: 'B+' } });

      const submitBtn = screen.getByRole('button', { name: /push\(\) New Student/i });
      fireEvent.click(submitBtn);

      expect(screen.getByText('John Doe')).toBeTruthy();
    });

    it('should remove the last student using pop', () => {
      render(<StudentDashboard students={MOCK_STUDENTS} />);

      const lastStudentName = MOCK_STUDENTS[MOCK_STUDENTS.length - 1].Student_Names;
      expect(screen.getByText(lastStudentName)).toBeTruthy();

      const popBtn = screen.getByRole('button', { name: /pop\(\) Remove Last/i });
      fireEvent.click(popBtn);

      expect(screen.queryByText(lastStudentName)).toBeNull();
    });

    it('should handle pop gracefully when the student list is empty', () => {
      render(<StudentDashboard students={[]} />);

      const popBtn = screen.getByRole('button', { name: /pop\(\) Remove Last/i });
      expect(() => fireEvent.click(popBtn)).not.toThrow();
    });

    it('should add a student to the start of the list using unshift when priority is checked', () => {
      render(<StudentDashboard students={MOCK_STUDENTS} />);

      fireEvent.change(screen.getByPlaceholderText('Student Name'), { target: { value: 'Priority Alice' } });
      fireEvent.change(screen.getByPlaceholderText('Roll No'), { target: { value: '111111' } });
      fireEvent.change(screen.getByPlaceholderText('Math'), { target: { value: '95' } });
      fireEvent.change(screen.getByPlaceholderText('Physics'), { target: { value: '98' } });
      fireEvent.change(screen.getByPlaceholderText('Chemistry'), { target: { value: '92' } });

      const priorityCheckbox = screen.getByRole('checkbox', { name: /Mark as Priority/i });
      fireEvent.click(priorityCheckbox);

      const submitBtn = screen.getByRole('button', { name: /unshift\(\) Priority Student/i });
      fireEvent.click(submitBtn);

      expect(screen.getByText('Priority Alice')).toBeTruthy();
    });

    it('should remove the first student using shift', () => {
      render(<StudentDashboard students={MOCK_STUDENTS} />);

      const firstStudentName = MOCK_STUDENTS[0].Student_Names;
      expect(screen.getByText(firstStudentName)).toBeTruthy();

      const shiftBtn = screen.getByRole('button', { name: /shift\(\) Process First/i });
      fireEvent.click(shiftBtn);

      expect(screen.queryByText(firstStudentName)).toBeNull();
    });

    it('should handle shift gracefully when the student list is empty', () => {
      render(<StudentDashboard students={[]} />);

      const shiftBtn = screen.getByRole('button', { name: /shift\(\) Process First/i });
      expect(() => fireEvent.click(shiftBtn)).not.toThrow();
    });
  });

  // =========================================================================
  // Card Remove Action (splice)
  // =========================================================================
  describe('Card removal by index (handleRemoveCardByIndex - splice)', () => {
    it('should remove a specific student card when its delete button is clicked', () => {
      render(<StudentDashboard students={MOCK_STUDENTS} />);

      expect(screen.getByText('Donald Contreras')).toBeTruthy();

      const deleteCardButtons = screen.getAllByTitle('Remove with splice()');
      fireEvent.click(deleteCardButtons[0]);

      expect(screen.queryByText('Donald Contreras')).toBeNull();
    });
  });
});
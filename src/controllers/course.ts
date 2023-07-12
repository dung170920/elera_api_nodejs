import {
  addCourse,
  getCourseById,
  getCourses,
  editCourse,
  deleteCourse,
  countCourses,
} from "../models";
import { Request, Response } from "express";
import { responseHandler } from "../utils";

export const getCourseList = async (req: Request, res: Response) => {
  try {
    const { pageNumber, pageSize, courseTypeId } = req.query;

    const parsePageNumber = Number(pageNumber);
    const parsePageSize = Number(pageSize);

    if (isNaN(parsePageNumber) || isNaN(parsePageSize)) {
      return responseHandler(res, 400, "Invalid page number and page size");
    }

    const count = await countCourses(courseTypeId?.toString());
    if (!count) {
      return responseHandler(res, 200, "Get list of course successfully", {
        data: [],
        pageNumber: parsePageNumber,
        pageSize: parsePageSize,
        totalPages: 0,
      });
    }

    const courses = await getCourses(
      parsePageNumber,
      parsePageSize,
      courseTypeId?.toString()
    );

    return responseHandler(res, 200, "Get list of course successfully", {
      data: courses,
      pageNumber: parsePageNumber,
      pageSize: parsePageSize,
      totalPages: Math.ceil(count / parsePageSize),
    });
  } catch (error) {
    return responseHandler(res, 500, error.message);
  }
};

export const getCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const course = await getCourseById(id);
    if (course) {
      return responseHandler(res, 200, "Get course successfully", course);
    }
    return responseHandler(res, 404, "Course not found");
  } catch (error) {
    return responseHandler(res, 500, error.message);
  }
};

export const createCourse = async (req: Request, res: Response) => {
  try {
    const course = await addCourse(req.body);
    if (course) {
      return responseHandler(res, 201, "Course created successfully", course);
    }
  } catch (error) {
    return responseHandler(res, 500, error.message);
  }
};

export const updateCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await editCourse(id, req.body);

    return responseHandler(res, 200, "Course updated successfully");
  } catch (error) {
    return responseHandler(res, 500, error.message);
  }
};

export const disableCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await deleteCourse(id);

    return responseHandler(res, 200, "Course disabled successfully");
  } catch (error) {
    return responseHandler(res, 500, error.message);
  }
};

// export const getEnrolledCourses = async (req: IRequest, res: Response) => {
//   try {
//     const { pageNumber, pageSize } = req.query;

//     const parsePageNumber = Number(pageNumber);
//     const parsePageSize = Number(pageSize);

//     if (isNaN(parsePageNumber) || isNaN(parsePageSize)) {
//       return responseHandler(res, 400, "Invalid page number and page size");
//     }

//     const count = await countCourses();
//     if (!count) {
//       return responseHandler(
//         res,
//         200,
//         "Get list of enrolled course successfully",
//         {
//           data: [],
//           pageNumber: parsePageNumber,
//           pageSize: parsePageSize,
//           totalPages: 0,
//         }
//       );
//     }

//     const courses = await getCourses(parsePageNumber, parsePageSize);

//     const coursesWithEnrollmentStatus = await Promise.all(
//       courses.map(async (course) => {
//         const isEnrolled = await getUsersWithEnrollment(course.id, req.user.id);
//         return { ...course.toObject(), isEnrolled };
//       })
//     );

//     return responseHandler(
//       res,
//       200,
//       "Get list of enrolled course successfully",
//       {
//         data: courses,
//         pageNumber: parsePageNumber,
//         pageSize: parsePageSize,
//         totalPages: Math.ceil(count / parsePageSize),
//       }
//     );
//   } catch (error) {
//     return responseHandler(res, 500, error.message);
//   }
// };

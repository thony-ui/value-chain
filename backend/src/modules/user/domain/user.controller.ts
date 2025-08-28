import type { NextFunction, Request, Response } from "express";
import { validateGetUser, validatePostUser } from "./user.validator";
import { UserService } from "./user.service";
import logger from "../../../logger";

export class UserController {
  constructor(private userService: UserService) {}
  postUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { handle } = req.body;
    const id = req.user.id;
    try {
      const parsedData = validatePostUser({ id, handle });
      logger.info(
        `UserController: postUser called with data: ${JSON.stringify(
          parsedData
        )}`
      );
      await this.userService.postUserToDatabase(parsedData);
      res.status(200).json({ message: "User added to database" });
    } catch (error) {
      next(error);
    }
  };
  getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const id = req.user.id;
    try {
      const parsedId = validateGetUser({ id });
      logger.info(
        `UserController: getUser called with id: ${JSON.stringify(parsedId)}`
      );
      const user = await this.userService.getUserFromDataBase(parsedId);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };
}

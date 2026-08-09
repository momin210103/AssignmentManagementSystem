import { Edit, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Card from "@/components/ui/Card";

import { usePublishAssignment } from "@/features/teacher/assignments/hooks/usePublishAssignment";
import { useUnpublishAssignment } from "@/features/teacher/assignments/hooks/useUnpublishAssignment";

import type { TeacherAssignment } from "../types/assignment";

type TeacherAssignmentTableProps = {
  assignments: TeacherAssignment[];
  isLoading: boolean;
  isError: boolean;
};

export default function TeacherAssignmentTable({
  assignments,
  isLoading,
  isError,
}: TeacherAssignmentTableProps) {
  const navigate = useNavigate();

  const publishMutation = usePublishAssignment();
  const unpublishMutation = useUnpublishAssignment();

  if (isLoading) {
    return (
      <Card>
        <div className="py-10 text-center text-text-muted">
          Loading assignments...
        </div>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <div className="py-10 text-center text-danger">
          Failed to load assignments.
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="border-b border-border">
              <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">
                #
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">
                Title
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">
                Description
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-text-secondary">
                Marks
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">
                Deadline
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-text-secondary">
                Status
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-text-secondary">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {assignments.map((assignment, index) => {
              const isDraft = assignment.status === "Draft";
              const isPublished = assignment.status === "Published";

              const isPublishing =
                publishMutation.isPending &&
                publishMutation.variables === assignment.id;

              const isUnpublishing =
                unpublishMutation.isPending &&
                unpublishMutation.variables === assignment.id;

              return (
                <tr
                  key={assignment.id}
                  className="
                    border-b
                    border-border
                    transition-colors
                    hover:bg-background
                  "
                >
                  {/* # */}
                  <td className="px-6 py-4 text-text-muted">{index + 1}</td>

                  {/* Title */}
                  <td className="px-6 py-4 font-medium text-text-primary">
                    {assignment.title}
                  </td>

                  {/* Description */}
                  <td className="max-w-xs px-6 py-4 text-text-secondary">
                    <p className="truncate">{assignment.description}</p>
                  </td>

                  {/* Marks */}
                  <td className="px-6 py-4 text-center text-text-secondary">
                    {assignment.maximumMarks}
                  </td>

                  {/* Deadline */}
                  <td className="px-6 py-4 text-text-secondary">
                    {new Date(assignment.deadline).toLocaleDateString()}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 text-center">
                    <span
                      className="
                        inline-flex
                        rounded-full
                        bg-primary/10
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        text-primary
                      "
                    >
                      {assignment.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      {/* Edit */}
                      <button
                        type="button"
                        title="Edit assignment"
                        onClick={() =>
                          navigate(`/teacher/assignments/${assignment.id}/edit`)
                        }
                        className="
                          inline-flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-lg
                          text-text-secondary
                          transition
                          hover:bg-primary/10
                          hover:text-primary
                        "
                      >
                        <Edit size={17} />
                      </button>

                      {/* Publish */}
                      {isDraft && (
                        <button
                          type="button"
                          title="Publish assignment"
                          disabled={isPublishing}
                          onClick={() => {
                            const confirmed = window.confirm(
                              "Are you sure you want to publish this assignment?",
                            );

                            if (!confirmed) return;

                            publishMutation.mutate(assignment.id);
                          }}
                          className="
                            inline-flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-lg
                            text-success
                            transition
                            hover:bg-success/10
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                          "
                        >
                          <Eye size={17} />
                        </button>
                      )}

                      {/* Unpublish */}
                      {isPublished && (
                        <button
                          type="button"
                          title="Unpublish assignment"
                          disabled={isUnpublishing}
                          onClick={() => {
                            const confirmed = window.confirm(
                              "Are you sure you want to unpublish this assignment?",
                            );

                            if (!confirmed) return;

                            unpublishMutation.mutate(assignment.id);
                          }}
                          className="
                              inline-flex
                              h-9
                              w-9
                              items-center
                              justify-center
                              rounded-lg
                              text-warning
                              transition
                              hover:bg-warning/10
                              disabled:cursor-not-allowed
                              disabled:opacity-50
                            "
                        >
                          <EyeOff size={17} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}

            {assignments.length === 0 && (
              <tr>
                <td colSpan={7} className="py-12 text-center text-text-muted">
                  No assignments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

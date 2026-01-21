import dbConfig from "@/middlewares/db.config";
import Certificate from "@/model/Certificate.model";
import Organisation from "@/model/Organisation.model";
import { NextResponse } from "next/server";

dbConfig();

export async function GET() {
  try {
    const totalCertificates = await Certificate.countDocuments();
    const totalOrganisations = await Organisation.countDocuments();

    const monthlyData = await Certificate.aggregate([
      {
        $group: {
          _id: { $month: "$issuedOn" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const monthlyIssued = monthlyData.map((entry) => ({
      month: new Date(0, entry._id - 1).toLocaleString("default", {
        month: "short",
      }),
      count: entry.count,
    }));

    return NextResponse.json({
      totalCertificates,
      totalOrganisations,
      monthlyIssued,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}

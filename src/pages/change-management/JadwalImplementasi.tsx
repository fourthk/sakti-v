import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const JadwalImplementasi = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const schedules = [
    {
      id: "CR-001",
      title: "Update Server Configuration",
      date: "20/1/2024",
      time: "14:00 - 16:00",
      pic: "John Doe",
      status: "Scheduled",
    },
    {
      id: "CR-002",
      title: "Deploy New Application",
      date: "22/1/2024",
      time: "10:00 - 12:00",
      pic: "Jane Smith",
      status: "Scheduled",
    },
    {
      id: "CR-003",
      title: "Database Migration",
      date: "25/1/2024",
      time: "20:00 - 23:00",
      pic: "Mike Johnson",
      status: "Scheduled",
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-foreground">Jadwal Implementasi</h1>
        <Button className="bg-[#384E66] hover:bg-[#2F4256] text-white">
          <Plus className="mr-2 h-4 w-4" />
          Tambah Jadwal
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-card border-border">
          <h2 className="text-xl font-semibold text-foreground mb-4">Kalender</h2>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border border-border mx-auto"
          />
        </Card>

        <Card className="p-6 bg-card border-border">
          <h2 className="text-xl font-semibold text-foreground mb-4">Daftar Jadwal</h2>
          <div className="space-y-3">
            {schedules.map((schedule) => (
              <div
                key={schedule.id}
                className="p-4 border border-border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">{schedule.id}</p>
                    <h3 className="font-semibold text-foreground mb-1">{schedule.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {schedule.date} • {schedule.time}
                    </p>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {schedule.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default JadwalImplementasi;

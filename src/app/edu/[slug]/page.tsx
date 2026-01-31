"use client";
import "@/resources/custom.css";
import Lenis from "lenis";

import {
  Text,
  Button,
  Column,
  Line,
  Flex,
  Row,
  Icon,
  Kbd,
  IconButton,
  Input,
  ThemeSwitcher,
  AvatarGroup,
  HeadingNav,
  HeadingLink,
  NumberInput,
  Select,
  Textarea,
  useToast,
  Spinner,
  List,
  ListItem,
  SmartLink,
  LineChart,
  BarChart,
  LineBarChart,
  PieChart,
  Table,
  Chip,
  LinearGauge,
  DataPoint,
} from "@once-ui-system/core";
import { Geist, DM_Mono } from "next/font/google";
import React, { useState } from "react";
import { Navbar } from "@/app/components/(global)/navbar";
import supabase from "@/app/supabase/client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const geist = Geist({ subsets: ["latin"] });
const mono = DM_Mono({
  subsets: ["latin"],
  weight: "300",
});

const lenis = new Lenis({
  autoRaf: true,
});

const companyLogo =
  "https://media.licdn.com/dms/image/v2/D560BAQFyPNfJhr3kZw/company-logo_100_100/B56Zs1v9oTKIAM-/0/1766133325738?e=1770854400&v=beta&t=c7QJ4ZxcL1Q7BexaTjs_hyBo8SWCDgPMQA0BUDl5WlQ";
const eduData={
  "metadata": {
    "updatedAt": "jan 29,2026",
    "name": "IIT Hyderabad",
    "type": "University",
    "slug": "iit-hyderabad"
  },
  "containers": [
    {
      "section": "description",
      "heading": {
        "level": 2,
        "title": "Description",
        "id": "description"
      },
      "content": [
        {
          "type": "text",
          "value": "IIT Hyderabad (IITH) is a premier engineering institute in Telangana, India, renowned for its focus on research, innovation, and hands-on learning. It offers undergraduate and postgraduate programs in fields like AI, biotechnology, and design, while fostering entreprpreneurship through startup incubators and global collaborations, especially with Japanese universities."
        },
      ]
    },
    {
      "section": "basic-details",
      "heading": {
        "level": 2,
        "title": "Basic Details",
        "id": "basic-details"
      },
      "content": [
        {
          "type": "text",
          "value": "Some common details about the university/tuition/college are given below:"
        },
        {
          "type": "list",
          "variant": "ul",
          "items": [
            {
              "text": "Estabilishment Year: [2008](https://example.com)",
              "children": []
            },
            {
              "text": "Language: [English/Regional](https://example.com)",
              "children": []
            },
            {
              "text": "Board: [CBSE/ICSE](https://example.com)",
              "children": []
            }
          ]
        }
      ]
    },
    {
      "section": "contact",
      "heading": {
        "level": 2,
        "title": "Contact",
        "id": "contact"
      },
      "content": [
        {
          "type": "text",
          "value": "Get in touch with us for any queries, suggestions, or feedback. Our team is always here to help you."
        },
        {
          "type": "list",
          "variant": "ul",
          "items": [
            {
              "text": "Email: [iith@iith.ac.in](mailto:iith@iith.ac.in)",
              "children": []
            },
            {
              "text": "Phone: [+91-1234567890](tel:+91-1234567890)",
              "children": []
            },
            {
              "text": "Fax: [+91-1234567890](fax:+91-1234567890)",
              "children": []
            },
            {
              "text": "Landline: [+91-1234567890](tel:+91-1234567890)",
              "children": []
            },
            {
              "text": "Website: [www.iith.ac.in](https://www.iith.ac.in)",
              "children": []
            }
          ]
        }
      ]
    },
    {
      "section": "location",
      "heading": {
        "level": 2,
        "title": "Location",
        "id": "location"
      },
      "content": [
        {
          "type": "text",
          "value": "IIT Hyderabad is located in Hyderabad, Telangana, India. It is situated in the heart of the city, in the vicinity of the Hyderabad International Airport and the Hyderabad Railway Station."
        },
        {
          "type": "list",
          "variant": "ul",
          "items": [
            {
              "text": "Check out the map [here](https://www.google.com/maps/place/IIT+Hyderabad/@17.4444444,78.4666667,17z/data=!3m1!4b1!4m5!3m4!1s0x3bcb999999999999:0x3bcb999999999999!8m2!3d17.4444444!4d78.4666667)",
              "children": []
            },
            {
              "text": "Nearest Bus Stop: [here](https://www.google.com/maps/place/IIT+Hyderabad/@17.4444444,78.4666667,17z/data=!3m1!4b1!4m5!3m4!1s0x3bcb999999999999:0x3bcb999999999999!8m2!3d17.4444444!4d78.4666667)",
              "children": []
            },
            {
              "text": "Nearest Metro Station: [here](https://www.google.com/maps/place/IIT+Hyderabad/@17.4444444,78.4666667,17z/data=!3m1!4b1!4m5!3m4!1s0x3bcb999999999999:0x3bcb999999999999!8m2!3d17.4444444!4d78.4666667)",
              "children": []
            }
          ]
        }
      ]
    },
    {
      "section": "facilities",
      "heading": {
        "level": 2,
        "title": "Facilities",
        "id": "facilities"
      },
      "content": [
        {
          "type": "text",
          "value": "IIT Hyderabad is equipped with state-of-the-art facilities to support its academic and research programs. Some of the facilities include:"
        },
       
        {
          "type": "table",
          "isCustom": false,
          "tableName": "default",
          "headers": [
            "key",
            "value"
          ],
          "rows": [
            {
              "key": "available",
              "value": "sport,library,computer laboratory,research park,campus recreation center,sports complex,auditorium,student union,institute of pharmaceutical sciences,electronics and communication engineering"
            },
            {
              "key": "unavailable",
              "value": "swimming pool, gym, library, hotel"
            }
          ]
        }
      ]
    },
    {
      "section": "next-rating",
      "heading": {
        "level": 2,
        "title": "Next Rating",
        "id": "next-rating"
      },
      "content": [
        {
          "type": "text",
          "value": "Our Agentic AI calculate the ratings based on the data of the institutions. Please check before applying."
        },
        {
          "type": "table",
          "isCustom": false,
          "tableName": "default",
          "headers": [
            "key",
            "value"
          ],
          "rows": [
            {
              "key": "overall",
              "value": "78"
            },
            {
              "key": "infrastructure",
              "value": "96"
            },
            {
              "key": "job placement rates",
              "value": "85"
            },
            {
              "key": "curriculum",
              "value": "80"
            },
            {
              "key": "ambiance",
              "value": "75"
            }
          ]
        }
      ]
    },
    {
      "section": "courses-offered",
      "heading": {
        "level": 2,
        "title": "Courses Offered",
        "id": "courses-offered"
      },
      "content": [
        {
          "type": "text",
          "value": "We offer a wide range of courses at IIT Hyderabad, including undergraduate, postgraduate, and research programs."
        },
        {
          "type": "table",
          "isCustom": true,
          "tableName": "courses",
          "headers": [
            "Course Name",
            "Years Required",
            "Specialization"
          ],
          "rows": [
            {
              "Course Name": "Bachelor of Science in Computer Science",
              "Years Required": "4 years",
              "Specialization": "AI, ML, Web Development"
            },
            {
              "Course Name": "Master of Science in Artificial Intelligence",
              "Years Required": "2 years",
              "Specialization": "NLP, Robotics"
            },
            {
              "Course Name": "Bachelor of Science in Electrical Engineering",
              "Years Required": "4 years",
              "Specialization": "Power Systems, Renewable Energy"
            },
            {
              "Course Name": "Master of Science in Materials Science and Engineering",
              "Years Required": "2 years",
              "Specialization": "Nanotechnology, Composite Materials"
            },
            {
              "Course Name": "Bachelor of Science in Chemical Engineering",
              "Years Required": "4 years",
              "Specialization": "Process Control, Environmental Engineering"
            },
            {
              "Course Name": "Master of Science in Machine Learning",
              "Years Required": "2 years",
              "Specialization": "Recommendation Systems, Computer Vision"
            },
            {
              "Course Name": "Bachelor of Science in Biotechnology",
              "Years Required": "4 years",
              "Specialization": "Molecular Biology, Bioinformatics"
            },
            {
              "Course Name": "Master of Science in Data Science",
              "Years Required": "2 years",
              "Specialization": "Data Mining, Predictive Analytics"
            },
            {
              "Course Name": "Bachelor of Science in Civil Engineering",
              "Years Required": "4 years",
              "Specialization": "Structural Engineering, Transportation Engineering"
            },
            {
              "Course Name": "Master of Science in Cybersecurity",
              "Years Required": "2 years",
              "Specialization": "Network Security, Secure Coding"
            },
            {
              "Course Name": "Bachelor of Science in Mechanical Engineering",
              "Years Required": "4 years",
              "Specialization": "Mechanical Design, Fluid Mechanics"
            }
          ]
        }
      ]
    },
    {
      "section": "admissions",
      "heading": {
        "level": 2,
        "title": "Admissions",
        "id": "admissions"
      },
      "content": [
        {
          "type": "text",
          "value": "Admission to IIT Hyderabad is a highly competitive process that evaluates candidates based on their academic merit and other factors."
        },
        {
          "type": "list",
          "variant": "ol",
          "items": [
            {
              "text": "Check out the admission [here](https://www.iith.ac.in/admissions)",
              "children": [
                {
                  "text": "Note: Admission is highly competitive",
                  "children": []
                },
                {
                  "text": "And it is also damn, nice",
                  "children": []
                }
              ]
            },
            {
              "text": "Check out the admission process [here](https://www.iith.ac.in/admissions-process)",
              "children": []
            }
          ]
        }
      ]
    },
    {
      "section": "fee-structure",
      "heading": {
        "level": 2,
        "title": "Fee Structure",
        "id": "fee-structure"
      },
      "content": [
        {
          "type": "text",
          "value": "The fee structure for the courses offered by IIT Hyderabad is as follows:"
        },
        {
          "type": "table",
          "isCustom": true,
          "tableName": "classes",
          "headers": [
            "Class",
            "Semester Fee (in INR)",
            "Annual Fee (in INR)"
          ],
          "rows": [
            {
              "Class": "1",
              "Semester Fee (in INR)": "9000",
              "Annual Fee (in INR)": "60000"
            },
            {
              "Class": "2",
              "Semester Fee (in INR)": "9000",
              "Annual Fee (in INR)": "60000"
            },
            {
              "Class": "3",
              "Semester Fee (in INR)": "9000",
              "Annual Fee (in INR)": "60000"
            },
            {
              "Class": "4",
              "Semester Fee (in INR)": "9000",
              "Annual Fee (in INR)": "60000"
            },
            {
              "Class": "5",
              "Semester Fee (in INR)": "9000",
              "Annual Fee (in INR)": "60000"
            },
            {
              "Class": "6",
              "Semester Fee (in INR)": "9000",
              "Annual Fee (in INR)": "60000"
            },
            {
              "Class": "7",
              "Semester Fee (in INR)": "9000",
              "Annual Fee (in INR)": "60000"
            },
            {
              "Class": "8",
              "Semester Fee (in INR)": "9000",
              "Annual Fee (in INR)": "60000"
            },
            {
              "Class": "9",
              "Semester Fee (in INR)": "9000",
              "Annual Fee (in INR)": "60000"
            },
            {
              "Class": "10",
              "Semester Fee (in INR)": "9000",
              "Annual Fee (in INR)": "60000"
            },
            {
              "Class": "11",
              "Semester Fee (in INR)": "9000",
              "Annual Fee (in INR)": "60000"
            },
            {
              "Class": "12",
              "Semester Fee (in INR)": "9000",
              "Annual Fee (in INR)": "60000"
            }
          ]
        }
      ]
    },
    {
      "section": "population",
      "heading": {
        "level": 2,
        "title": "Population",
        "id": "population"
      },
      "content": [
        {
          "type": "text",
          "value": "The population of IIT Hyderabad currently stands at around 10,000 students, with a few hundred faculty members and staff."  
        },
        {
          "type": "chart",
          "variant": "pie",
          "config": {
            "key": "value",
            "title": "Student and Teacher Number",
            "description": "Student and Teacher Number",
            "legend": "bottom-center",
            "ring": "60, 70",
            "tooltip": "true",
            "gradiant": "outline"
          },
          "data": [
            {
              "key": "Students",
              "value": 1000,
              "color": "aqua"
            },
            {
              "key": "Teachers",
              "value": 50,
              "color": "green"
            }
          ]
        },
        {
          "type": "chart",
          "variant": "bar",
          "config": {
            "key": "value",
            "title": "Number of Students/Teachers",
            "description": "Number of Students/Teachers",
            "legend": "bottom-center",
            "axis": "none",
            "grid": "both",
            
          },
          "data": [
            {
              "group": "Main Campus",
              "key": "Student",
              "value": 1000,
              "color": "red"
            },
            {
              "group": "Main Campus",
              "key": "Teacher",
              "value": 50,
              "color": "yellow"
            },
            {
              "group": "Research Wing",
              "key": "Student",
              "value": 200,
              "color": "purple"
            },
            {
              "group": "Research Wing",
              "key": "Teacher",
              "value": 20,
              "color": "blue"
            }
          ]
        }
      ]
    },
    {
      "section": "placements",
      "heading": {
        "level": 2,
        "title": "Placements",
        "id": "placements"
      },
      "content": [
        {
          "type": "text",
          "value": "IIT Hyderabad boasts excellent placements with top companies recruiting across tech," +
          "engineering, and research sectors. The process attracts leading firms offering diverse roles," +
          "supported by a dedicated career services team. Students benefit from strong industry ties" +
          "and pre-placement offers from internships."
        },
        {
          "type": "row",
          "name": "1",
          "items": [
            {
              "type": "chart",
              "variant": "line",
              "config": {
                "key": "value",
                "title": "Number of Students/Teachers",
                "description": "Number of Students/Teachers",
                "legend": "bottom-center",
                "axis": "both",
                "grid": "both",
              },
              "data": [
                {
                  "group": "Main Campus",
                  "key": "Student",
                  "value": 1000,
                  "color": "red"
                },
                {
                  "group": "Main Campus",
                  "key": "Teacher",
                  "value": 50,
                  "color": "yellow"
                },
                {
                  "group": "Research Wing",
                  "key": "Student",
                  "value": 200,
                  "color": "purple"
                },
                {
                  "group": "Research Wing",
                  "key": "Teacher",
                  "value": 20,
                  "color": "blue"
                }
              ]
            },
            {
              "type": "chart",
              "variant": "linebar",
              "config": {
                "key": "value",
                "title": "Number of Students/Teachers",
                "description": "Number of Students/Teachers",
                "legend": "bottom-center",
                "axis": "y",
                "grid": "both",
                "gradiant": "flat,gradient,outline"
              },
              "data": [
                {
                  "group": "Main Campus",
                  "key": "Student",
                  "value": 1000,
                  "color": "red"
                },
                {
                  "group": "Main Campus",
                  "key": "Teacher",
                  "value": 50,
                  "color": "yellow"
                },
                {
                  "group": "Research Wing",
                  "key": "Student",
                  "value": 200,
                  "color": "purple"
                },
                {
                  "group": "Research Wing",
                  "key": "Teacher",
                  "value": 20,
                  "color": "blue"
                }
              ]
            }
          ]
        },
        {
          "type": "text",
          "value": "It was a nice joke"
        },
        {
          "type": "list",
          "variant": "ul",
          "items": [
            {
              "text": "Check out the map [here](https://www.google.com/maps/place/IIT+Hyderabad/@17.4444444,78.4666667,17z/data=!3m1!4b1!4m5!3m4!1s0x3bcb999999999999:0x3bcb999999999999!8m2!3d17.4444444!4d78.4666667)",
              "children": []
            },
            {
              "text": "Nearest Bus Stop: [here](https://www.google.com/maps/place/IIT+Hyderabad/@17.4444444,78.4666667,17z/data=!3m1!4b1!4m5!3m4!1s0x3bcb999999999999:0x3bcb999999999999!8m2!3d17.4444444!4d78.4666667)",
              "children": []
            },
            {
              "text": "Nearest Metro Station: [here](https://www.google.com/maps/place/IIT+Hyderabad/@17.4444444,78.4666667,17z/data=!3m1!4b1!4m5!3m4!1s0x3bcb999999999999:0x3bcb999999999999!8m2!3d17.4444444!4d78.4666667)",
              "children": []
            }
          ]
        }
      ]
    }
  ]
}


// --- Types ---
type ContentItem = {
  type: string;
  value?: string;
  variant?: string;
  items?: any[];
  headers?: string[];
  rows?: any[];
  config?: any;
  data?: any;
  isCustom?: boolean;
};

type Section = {
  section: string;
  heading: { level: number; title: string; id: string };
  content: ContentItem[];
};

const renderStyledText = (text: string) => {
  if (!text || typeof text !== "string") return text;
  const parts = text.split(/(\[[^\]]+\]\([^\)]+\))/g);
  return parts.map((part, index) => {
    const match = part.match(/\[([^\]]+)\]\(([^\)]+)\)/);
    if (match) {
      return (
        <SmartLink key={index} href={match[2]}>
          {match[1]}
        </SmartLink>
      );
    }
    return part;
  });
};

// --- Sub-Components ---

const RenderHeading = ({ level, title, id }: { level: number; title: string; id: string }) => (
  <HeadingLink as={`h${level}` as any} id={id}>
    {renderStyledText(title)}
  </HeadingLink>
);

const RenderText = ({ value }: { value: string }) => (
  <Text
    variant="body-default-l"
    data-scaling="110"
    onBackground="neutral-weak"
    style={{ lineHeight: "2" }}
  >
    {renderStyledText(value)}
  </Text>
);

const RenderFacilities = ({ rows }: { rows: any[] }) => {
  const available = rows.find((r) => r.key === "available")?.value.split(",") || [];
  const unavailable = rows.find((r) => r.key === "unavailable")?.value.split(",") || [];

  return (
    <Column gap="12">
      <Row fillWidth gap="12" wrap>
        {available.map((item: string, i: number) => (
          <Chip key={i} label={item.replace(/\b\w/g, (match:any) => match.toUpperCase())} />
        ))}
      </Row>
      <Row fillWidth gap="12" wrap>
        {unavailable.map((item: string, i: number) => (
          <Chip key={i} label={item.replace(/\b\w/g, (match:any) => match.toUpperCase())} selected={false} />
        ))}
      </Row>
    </Column>
  );
};

const RenderNextRating = ({ rows }: { rows: any[] }) => (
  <Column gap="16">
    {rows.map((row, i) => (
      <Column key={i} gap="32" style={{ display: "grid", gridTemplateColumns: "1fr 5fr" }}>
        <Column gap="20" vertical="center">
          <Text variant="body-default-s" data-scaling="110" onBackground="neutral-medium">
            <SmartLink href="#">{row.key.replace(/\b\w/g, (match:any) => match.toUpperCase())}</SmartLink>
          </Text>
        </Column>
        <LinearGauge
          maxWidth={30}
          fillWidth
          height={12}
          maxHeight={3}
          value={parseInt(row.value)}
          labels={["Low", "Med", "High", "Max"]}
        />
      </Column>
    ))}
  </Column>
);

const RenderTable = ({ headers, rows }: { headers: any[]; rows: any[] }) => {
  // Apply link parser to table cells
  const formattedRows = rows.map((row) => headers.map((h) => renderStyledText(row[h])));
  const formattedHeaders = headers.map((h) => ({ content: h, key: h, sortable: true }));
  return <Table data={{ headers: formattedHeaders, rows: formattedRows }} />;
};
const RenderChart = ({ variant, config, data }: { variant: string; config: any; data: any[] }) => {
  const [inner, outer] = config.ring ? config.ring.split(",").map(Number) : [60, 70];
  const gradientArray = config.gradiant ? config.gradiant.split(",") : ["flat"];

  const seriesMap = new Map();
  data.forEach((item) => {
    const keyName = item.key || item.data;
    if (!seriesMap.has(keyName)) {
      seriesMap.set(keyName, {
        key: keyName,
        color: item.color,
      });
    }
  });
  const series = Array.from(seriesMap.values());

  const pivotData = () => {
    const hasGrouping = data.some(item => item.group !== undefined && item.group !== null);

    if (!hasGrouping) {
      
      return data.map(item => ({
        label: item.key || item.data,
        [item.key || item.data]: item.value
      }));
    }

    
    const groups: any = {};
    data.forEach((item) => {
      const groupName = item.group;
      if (!groups[groupName]) {
        groups[groupName] = { label: groupName };
      }
      groups[groupName][item.key || item.data] = item.value;
    });
    return Object.values(groups);
  };

  const transformedData = pivotData();

  const commonProps = {
    title: config.title,
    description: config.description,
    legend: { display: true, position: config.legend },
    axis: config.axis,
    grid: config.grid,
    gradient: gradientArray,
    series: series,
    data: transformedData,
  };

  switch (variant) {
    case "pie":
      return (
        <PieChart
          {...commonProps}
          ring={{ inner, outer }}
          tooltip={config.tooltip === "true"}
          // Pie chart always uses a simple flat structure
          data={data.map((d) => ({ name: d.data || d.key, value: d.value }))}
        />
      );
    case "bar":
      return <BarChart {...commonProps} data={transformedData as DataPoint[]} />;
    case "line":
      return <LineChart {...commonProps}  data={transformedData as DataPoint[]}  />;
    case "linebar":
      return <LineBarChart {...commonProps}data={transformedData as DataPoint[]}  />;
    default:
      return null;
  }
};

// --- Content Router ---

const renderContent = (item: ContentItem, sectionId: string): React.ReactNode => {
  switch (item.type) {
    case "text":
      return <RenderText value={item.value || ""} />;
    
    case "list":
      return (
        <Column gap="8" as={item.variant === "ol" ? "ol" : "ul"}>
          {item.items?.map((li, i) => (
            <React.Fragment key={i}>
              <RenderText value={(i+1)+"."+ " "+ li.text || ""} />
              {li.children?.map((child: any, ci: number) => (
                <div key={ci} style={{ paddingLeft: '20px' }}>
                   <RenderText value={(ci+1)+"."+ " "+ child.text || ""} />
                </div>
              ))}
            </React.Fragment>
          ))}
        </Column>
      );

    case "table":
      if (sectionId === "facilities") return <RenderFacilities rows={item.rows || []} />;
      if (sectionId === "next-rating") return <RenderNextRating rows={item.rows || []} />;
      return <RenderTable headers={item.headers || []} rows={item.rows || []} />;

    case "chart":
      return <RenderChart variant={item.variant || ""} config={item.config} data={item.data} />;

    case "row":
      return (
        <Row fillWidth gap="20">
          {item.items?.map((child, idx) => (
            <div key={idx} style={{ flex: 1 }}>{renderContent(child, sectionId)}</div>
          ))}
        </Row>
      );

    default:
      return null;
  }
};


export default function Home() {
  if (!eduData) return null;

  return (
    <Column fillWidth vertical="start" horizontal="center" padding="m" onBackground="neutral-strong">
      <Navbar />
      <Flex height={"64"} />
      
      <Column fillWidth vertical="start" maxWidth={"l"} gap="56">
        <Column fillWidth gap="12" id={eduData?.metadata?.slug || ""}>
          <Text variant="body-default-m" onBackground="neutral-medium">{eduData?.metadata?.updatedAt || ""}</Text>
          <Text variant="display-strong-m">{eduData?.metadata?.type || ""}</Text>
          <Text variant="body-default-l" onBackground="neutral-weak">{eduData?.metadata?.name || ""}</Text>
        </Column>

        <Row fillWidth horizontal="between" gap="40">
          <Column gap="48" fillWidth id="paddingRightContainerEdu">
            <Line fillWidth />
            {eduData.containers.map((container: Section) => (
              <Column key={container.section} id={container.heading.id} gap="20">
                <RenderHeading {...container.heading} />
                <Column gap="32" fillWidth>
                  {container.content.map((item, index) => (
                    <React.Fragment key={index}>
                      {renderContent(item, container.section)}
                    </React.Fragment>
                  ))}
                </Column>
              </Column>
            ))}
          </Column>

          <HeadingNav
            width={12}
            position="sticky"
            top="64"
            fitHeight
            id="headingNavMe"
            data-scaling="110"
          />
        </Row>
      </Column>
      <Flex height={3} />
    </Column>
  );
}